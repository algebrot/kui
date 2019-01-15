/*
 * Copyright 2018 IBM Corporation
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

import * as fs from 'fs'
import * as path from 'path'
import * as assert from 'assert'

import * as common from '@test/lib/common'
import * as ui from '@test/lib/ui'
import * as openwhisk from '@test/lib/openwhisk/openwhisk'
const { cli, selectors, sidecar } = ui

const flip = 'flip'

const removeWhitespace = txt => txt.replace(/\s/g, '')

describe('blackbox actions from a shell script', function (this: common.ISuite) {
  before(openwhisk.before(this))
  after(common.after(this))

  it('should have an active repl', () => cli.waitForRepl(this.app))

  const root = path.dirname(require.resolve('@test/package.json'))
  const expectedFlipSource = removeWhitespace(fs.readFileSync(path.join(root, 'data/openwhisk/flip.sh')).toString())

  it('should create a blackbox action', () => cli.do(`wsk action create --native ${flip} ./data/openwhisk/flip.sh`, this.app)
    .then(cli.expectOK)
    .then(sidecar.expectOpen)
    .then(sidecar.expectShowing(flip))
    .then(() => this.app.client.getText(ui.selectors.SIDECAR_ACTION_SOURCE))
    .then(removeWhitespace)
    .then(txt => assert.strictEqual(txt, expectedFlipSource))
    .catch(common.oops(this)))

  const N1 = 3
  it(`should invoke the native action with implicit entity`, () => cli.do(`invoke -p n ${N1}`, this.app)
    .then(cli.expectOK)
    .then(sidecar.expectOpen)
    .then(sidecar.expectShowing(flip))
    .then(sidecar.expectResultSubset({
      trials: N1
    }))
    .catch(common.oops(this)))

  const N2 = 4
  it(`should invoke (again) the native action with implicit entity`, () => cli.do(`invoke -p n ${N2}`, this.app)
    .then(cli.expectOK)
    .then(sidecar.expectOpen)
    .then(sidecar.expectShowing(flip))
    .then(sidecar.expectResultSubset({
      trials: N2
    }))
    .catch(common.oops(this)))

  it('should update a blackbox action variant 1', () => cli.do(`wsk action update --native ${flip} ./data/openwhisk/flip.sh`, this.app)
    .then(cli.expectOK)
    .then(sidecar.expectOpen)
    .then(sidecar.expectShowing(flip))
    .then(() => this.app.client.getText(ui.selectors.SIDECAR_ACTION_SOURCE))
    .then(removeWhitespace)
    .then(txt => assert.strictEqual(txt, expectedFlipSource))
    .catch(common.oops(this)))

  it('should update a blackbox action variant 2', () => cli.do(`wsk action update ${flip} --native ./data/openwhisk/flip.sh`, this.app)
    .then(cli.expectOK)
    .then(sidecar.expectOpen)
    .then(sidecar.expectShowing(flip))
    .then(() => this.app.client.getText(ui.selectors.SIDECAR_ACTION_SOURCE))
    .then(removeWhitespace)
    .then(txt => assert.strictEqual(txt, expectedFlipSource))
    .catch(common.oops(this)))

  it('should update a blackbox action variant 3', () => cli.do(`wsk action update ${flip} ./data/openwhisk/flip.sh --native`, this.app)
    .then(cli.expectOK)
    .then(sidecar.expectOpen)
    .then(sidecar.expectShowing(flip))
    .then(() => this.app.client.getText(ui.selectors.SIDECAR_ACTION_SOURCE))
    .then(removeWhitespace)
    .then(txt => assert.strictEqual(txt, expectedFlipSource))
    .catch(common.oops(this)))

  const N3 = 5
  it(`should invoke (again) the native action, now with explicit`, () => cli.do(`invoke ${flip} -p n ${N3}`, this.app)
    .then(cli.expectOK)
    .then(sidecar.expectOpen)
    .then(sidecar.expectShowing(flip))
    .then(sidecar.expectResultSubset({
      trials: N3
    }))
    .catch(common.oops(this)))
})
