/*
 * Copyright 2020 The Kubernetes Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Here we arrange the CSS for base functionality of Kui. Order is
 * preserved in the resulting <link> tags.
 *
 */
import '../web/css/static/carbon-overrides-common.css'
import '../web/css/static/inverted-colors.css'
import '../web/css/static/ui.css'
import '../web/css/static/repl.scss'

// default client
export { default as Kui, Props as KuiProps } from './components/Client/Kui'

// Client components
// export { default as InputStripe } from './components/Client/InputStripe'
export { default as TabContainer } from './components/Client/TabContainer'
export { default as TabContent } from './components/Client/TabContent'
export { default as TabModel, uuid as allocateTabUUID } from './components/Client/TabModel'
export { default as StatusStripe } from './components/Client/StatusStripe'
export { default as CurrentWorkingDirectory } from './components/Client/StatusStripe/CurrentWorkingDirectory'
export { default as SpaceFiller } from './components/Client/StatusStripe/SpaceFiller'
export { default as MeterWidgets } from './components/Client/StatusStripe/MeterWidgets'
export { default as ContextWidgets } from './components/Client/StatusStripe/ContextWidgets'
export { ViewLevel, default as TextWithIconWidget } from './components/Client/StatusStripe/TextWithIconWidget'
export { default as Settings } from './components/Client/StatusStripe/Settings'
export { default as TagWidget } from './components/Client/StatusStripe/TagWidget'
export { default as DropdownWidget } from './components/Client/StatusStripe/DropdownWidget'
export { default as KuiContext } from './components/Client/context'

// Content components
export { default as Loading } from './components/spi/Loading'
export { default as Markdown } from './components/Content/Markdown'
export { default as HTMLDom } from './components/Content/Scalar/HTMLDom'

// sidecar components
export { default as TopNavSidecar } from './components/Views/Sidecar/TopNavSidecarV2'
export { default as LeftNavSidecar } from './components/Views/Sidecar/LeftNavSidecarV2'

// SPI
export { default as Alert } from './components/spi/Alert'
export { default as Button } from './components/spi/Button'
export { default as Card } from './components/spi/Card'
export { default as Popover } from './components/spi/Popover'
export { default as Select } from './components/spi/Select'
export { default as Tag } from './components/spi/Tag'
export { default as Tooltip } from './components/spi/Tooltip'

// Input components
export {
  InputProvider,
  State as InputProviderState,
  Props as InputProviderProps
} from './components/Views/Terminal/Block/Input'
export { default as defaultOnKeyDown } from './components/Views/Terminal/Block/OnKeyDown'
export { default as defaultOnKeyPress } from './components/Views/Terminal/Block/OnKeyPress'
export { onKeyUp as defaultOnKeyUp } from './components/Views/Terminal/Block/ActiveISearch'

// spi
export { default as Icons } from './components/spi/Icons'
export { default as DropDown, DropDownAction } from './components/spi/DropDown'

declare let __KUI_RUNNING_KUI_TEST: boolean
export function inDebugMode() {
  return (
    (typeof __KUI_RUNNING_KUI_TEST !== 'undefined' && __KUI_RUNNING_KUI_TEST) ||
    process.env.RUNNING_KUI_TEST ||
    process.env.RUNNING_SHELL_TEST
  )
}
