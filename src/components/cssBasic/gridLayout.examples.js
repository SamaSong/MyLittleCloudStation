export const gridContainerExample = `.dashboard {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  grid-template-rows: 56px minmax(0, 1fr);
  grid-template-areas:
    "aside header"
    "aside main";
  min-height: 100vh;
}`

export const autoFitCardExample = `.card-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}`

export const minmaxOverflowExample = `.page {
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr);
}

.content {
  min-width: 0;
  overflow: auto;
}`
