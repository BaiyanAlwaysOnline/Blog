//package.json入口文件
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)
export { default as Button } from "./components/Button";
export { default as Menu } from "./components/Menu";
export { default as AutoComplete } from "./components/AutoComplete";
export { default as Input } from "./components/Input";
export { default as Icon } from "./components/Icon";
export { default as Progress } from "./components/Progress";
export { default as Upload } from "./components/Upload";
export { default as Transition } from "./components/Transition";
