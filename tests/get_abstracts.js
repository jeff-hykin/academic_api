#!/usr/bin/env -S deno run --allow-all
import { Reference, search, loadReferences, getReferences } from '../main/main.js'
import * as yaml from "https://deno.land/std@0.168.0/encoding/yaml.ts"
import { FileSystem, glob } from "https://deno.land/x/quickr@0.7.6/main/file_system.js"

const data = await FileSystem.read(`${FileSystem.thisFolder}/example_data.yaml`)
const references = yaml.parse(data).references
loadReferences(references)
const allReferences = getReferences()
const { abstracts, warnings } = await allReferences[0].fillAbstractsFromHtml()
console.debug(`abstracts is:`,abstracts)
console.debug(`warnings is:`,warnings)