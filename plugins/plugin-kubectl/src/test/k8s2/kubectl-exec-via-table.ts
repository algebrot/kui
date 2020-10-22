/*
 * Copyright 2019 IBM Corporation
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

import { Common, CLI, ReplExpect, Selectors } from '@kui-shell/test'
import { waitForGreen, createNS, allocateNS, deleteNS } from '@kui-shell/plugin-kubectl/tests/lib/k8s/utils'

const wdescribe = !process.env.USE_WATCH_PANE ? describe : xdescribe

wdescribe(`kubectl exec basic stuff via table ${process.env.MOCHA_RUN_TARGET || ''}`, function(this: Common.ISuite) {
  before(Common.before(this))
  after(Common.after(this))

  const ns: string = createNS()
  allocateNS(this, ns)

  const podName = 'nginx'
  it('should create sample pod from URL', () => {
    return CLI.command(
      `kubectl create -f https://raw.githubusercontent.com/kubernetes/examples/master/staging/pod -n ${ns}`,
      this.app
    )
      .then(ReplExpect.okWithString(podName))
      .catch(Common.oops(this, true))
  })

  it('should wait for the pod to come up', () => {
    return CLI.command(`kubectl get pod ${podName} -n ${ns} -w`, this.app)
      .then(
        ReplExpect.okWithCustom<string>({ selector: Selectors.BY_NAME(podName) })
      )
      .then(selector => waitForGreen(this.app, selector))
      .catch(Common.oops(this, true))
  })

  it('should exec ls through pty', () => {
    return CLI.command(`kubectl exec ${podName} -n ${ns} -- ls`, this.app)
      .then(ReplExpect.okWithString('bin'))
      .catch(Common.oops(this, true))
  })

  it('should exec pwd through pty', () => {
    return CLI.command(`kubectl exec ${podName} -n ${ns} -- pwd`, this.app)
      .then(ReplExpect.okWithString('/'))
      .catch(Common.oops(this, true))
  })

  deleteNS(this, ns)
})
