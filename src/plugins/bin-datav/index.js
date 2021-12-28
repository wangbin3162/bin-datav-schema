import { ScrollTable, Decorator } from 'bin-datav'

export function registerDatav(app) {
  app.component(ScrollTable.name, ScrollTable)
  app.component(Decorator.name, Decorator)
}
