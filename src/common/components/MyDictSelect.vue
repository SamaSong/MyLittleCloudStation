<template>
  <div>
    <component :is="selectVNode"></component>
  </div>
</template>

<script setup>
import {
  computed,
  getCurrentInstance,
  h,
  onMounted,
  ref,
  useAttrs,
  useSlots,
  watch,
} from "vue";
import { ElOption, ElSelect } from "element-plus";

const props = defineProps({
  dictCode: {
    type: [String, Number],
    default: "",
  },
  dictOptions: {
    type: Array,
    default: () => [],
  },
  fetchDict: {
    type: Function,
    default: null,
  },
  autoLoad: {
    type: Boolean,
    default: true,
  },
  labelKey: {
    type: String,
    default: "label",
  },
  valueKey: {
    type: String,
    default: "value",
  },
  disabledKey: {
    type: String,
    default: "disabled",
  },
});

const emit = defineEmits(["loaded", "error", "update:dictOptions"]);

const attrs = useAttrs();
const slots = useSlots();
const vm = getCurrentInstance();

const loading = ref(false);
const internalOptions = ref([]);

const normalizeOptions = (list) => {
  if (!Array.isArray(list)) {
    return [];
  }

  return list.map((item, index) => {
    if (item && typeof item === "object") {
      const normalized = { ...item };
      if (!(props.valueKey in normalized)) {
        normalized[props.valueKey] =
          normalized.value ?? normalized.id ?? normalized.key ?? index;
      }
      if (!(props.labelKey in normalized)) {
        normalized[props.labelKey] =
          normalized.label ??
          normalized.name ??
          String(normalized[props.valueKey] ?? index);
      }
      if (!(props.disabledKey in normalized)) {
        normalized[props.disabledKey] = normalized.disabled ?? false;
      }
      return normalized;
    }

    return {
      [props.valueKey]: item,
      [props.labelKey]: String(item),
      [props.disabledKey]: false,
    };
  });
};

const assignOptions = (list) => {
  internalOptions.value = normalizeOptions(list);
};

const loadDict = async () => {
  if (!props.fetchDict) {
    assignOptions(props.dictOptions);
    return internalOptions.value;
  }

  try {
    loading.value = true;
    const result = await props.fetchDict(props.dictCode);
    assignOptions(result ?? []);
    emit("update:dictOptions", [...internalOptions.value]);
    emit("loaded", internalOptions.value);
    return internalOptions.value;
  } catch (error) {
    emit("error", error);
    throw error;
  } finally {
    loading.value = false;
  }
};

watch(
  () => props.dictOptions,
  (val) => {
    assignOptions(val);
  },
  { deep: true, immediate: true },
);

watch(
  () => props.dictCode,
  (newVal, oldVal) => {
    if (
      props.fetchDict &&
      props.autoLoad &&
      newVal !== oldVal
    ) {
      loadDict();
    }
  },
);

onMounted(() => {
  if (props.fetchDict && props.autoLoad) {
    loadDict();
  } else {
    assignOptions(props.dictOptions);
  }
});

const changeRef = (exposed) => {
  vm.exposed = {
    ...(exposed || {}),
    reload: loadDict,
    getOptions: () => internalOptions.value,
  };
};

const selectSlots = computed(() => {
  const slotEntries = { ...slots };

  if (slots.default) {
    slotEntries.default = (slotProps) =>
      slots.default({
        ...slotProps,
        options: internalOptions.value,
        loading: loading.value,
      });
  } else {
    slotEntries.default = () =>
      internalOptions.value.map((option) =>
        h(ElOption, {
          key: option[props.valueKey],
          label: option[props.labelKey],
          value: option[props.valueKey],
          disabled: Boolean(option[props.disabledKey]),
        }),
      );
  }

  return slotEntries;
});

const selectVNode = computed(() =>
  h(
    ElSelect,
    {
      ...attrs,
      loading: loading.value,
      ref: changeRef,
    },
    selectSlots.value,
  ),
);
</script>

<style scoped lang="scss">

</style>
