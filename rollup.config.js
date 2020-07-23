import packageJson from "./package.json";
import babel from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";

const addMin = (file) => `${file.slice(0, file.lastIndexOf("."))}.min${file.slice(file.lastIndexOf("."), file.length)}`;
const minPlugins = [terser()];

export default [
	{
		input: packageJson.input,
		output: [
			{
				name: packageJson.moduleName,
				file: packageJson.browser,
				format: "umd",
			},
			{
				file: packageJson.main,
				format: "cjs",
				exports: "default",
			},
			{
				file: packageJson.module,
				format: "es",
			},
			{
				name: packageJson.moduleName,
				file: addMin(packageJson.browser),
				format: "umd",
				plugins: minPlugins,
			},
			{
				file: addMin(packageJson.main),
				format: "cjs",
				exports: "default",
				plugins: minPlugins,
			},
			{
				file: addMin(packageJson.module),
				format: "es",
				plugins: minPlugins,
			},
		],
		plugins: [
			babel({
				babelHelpers: "bundled",
			}),
		],
	},
];
