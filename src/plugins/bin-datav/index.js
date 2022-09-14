import { ScrollTable, Decorator, CapsuleChart } from 'bin-datav'

export function registerDatav(app) {
  app.component(ScrollTable.name, ScrollTable)
  app.component(Decorator.name, Decorator)
  app.component(CapsuleChart.name, CapsuleChart)
}
