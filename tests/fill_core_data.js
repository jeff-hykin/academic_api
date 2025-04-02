#!/usr/bin/env -S deno run --allow-all
import { Reference, search, loadReferences, getReferences } from '../main/main.js'
import * as yaml from "https://deno.land/std@0.168.0/encoding/yaml.ts"
import { FileSystem, glob } from "https://deno.land/x/quickr@0.7.6/main/file_system.js"

var data = await FileSystem.read(`${FileSystem.thisFolder}/example_data.yaml`)
var references = yaml.parse(data).references
loadReferences(references)
var allReferences = getReferences()
var { coreData, warnings } = await allReferences[0].fillCoreData()
console.debug(`coreData is:`,coreData)
console.debug(`warnings is:`,warnings)