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

import { ReactNode } from 'react'
import { REPL } from '@kui-shell/core'

type SessionProps = {
  /** [Optional] session init started view */
  loading?: ReactNode

  /** [Optional] session was severed; reinit started view */
  reinit?: ReactNode

  /** [Optional] session could not be established; error view */
  loadingError?: (err: Error) => ReactNode

  /** [Optional] session established! welcome to your session view */
  loadingDone?: (repl: REPL) => ReactNode
}

export default SessionProps
