const JavaScriptObfuscator = require('javascript-obfuscator')
const fs = require('fs')
const path = require('path')

// Next.js specifikus konfiguráció
const config = {
	obfuscatorConfig: {
		compact: true,
		controlFlowFlattening: false,
		deadCodeInjection: false,
		debugProtection: false,
		disableConsoleOutput: false,
		identifierNamesGenerator: 'hexadecimal',
		renameGlobals: false,
		rotateStringArray: true,
		selfDefending: false,
		stringArray: true,
		stringArrayEncoding: ['base64'],
		stringArrayThreshold: 0.75,
		unicodeEscapeSequence: false,
	},

	// Kritikus fájlok és könyvtárak, amiket nem módosítunk
	exclude: [
		'node_modules',
		'_document',
		'_app',
		'_error',
		'webpack-runtime',
		'polyfills',
		'main-',
		'build-manifest.json',
		'react-loadable-manifest.json',
		'middleware-manifest',
		'middleware-build-manifest',
		'middleware-react-loadable-manifest',
		'required-server-files.json',
		'routes-manifest.json',
		'prerender-manifest.json',
		'build-id.txt',
		'BUILD_ID',
	],
}

// Fájl kódoló függvény
function obfuscateFile(filePath) {
	try {
		// Ellenőrizzük, hogy a fájl kihagyandó-e
		if (config.exclude.some((exc) => path.basename(filePath).includes(exc))) {
			console.log(`Kihagyva: ${filePath}`)
			return false
		}

		const code = fs.readFileSync(filePath, 'utf8')

		// Ellenőrizzük, hogy a fájl tartalmaz-e Next.js specifikus kódot
		const isNextSpecific =
			code.includes('__NEXT_DATA__') ||
			code.includes('__webpack_require__') ||
			code.includes('webpack_require')

		if (isNextSpecific) {
			console.log(`Next.js specifikus fájl kihagyva: ${filePath}`)
			return false
		}

		const result = JavaScriptObfuscator.obfuscate(code, config.obfuscatorConfig)

		// Felülírjuk az eredeti fájlt
		fs.writeFileSync(filePath, result.getObfuscatedCode())
		console.log(`Sikeres kódolás: ${filePath}`)
		return true
	} catch (error) {
		console.error(`Hiba a fájl kódolásakor: ${filePath}`, error)
		return false
	}
}

// Könyvtár feldolgozó
function processDirectory(dir) {
	const items = fs.readdirSync(dir)

	items.forEach((item) => {
		const fullPath = path.join(dir, item)

		const stat = fs.statSync(fullPath)

		if (stat.isDirectory()) {
			// Csak bizonyos könyvtárakat dolgozunk fel
			if (item === 'static' || item === 'pages' || item === 'chunks') {
				processDirectory(fullPath)
			}
		} else if (stat.isFile() && path.extname(item) === '.js') {
			obfuscateFile(fullPath)
		}
	})
}

// Főprogram
function obfuscateNextProject() {
	console.log('Next.js projekt kódolás kezdése...')

	const nextDir = path.join(process.cwd(), '.next')

	// Ellenőrizzük a .next könyvtár létezését
	if (!fs.existsSync(nextDir)) {
		throw new Error('Nem található .next könyvtár. Futtasd először: npm run build')
	}

	// Készítsünk biztonsági másolatot
	const backupDir = path.join(process.cwd(), '.next-backup')
	if (fs.existsSync(backupDir)) {
		fs.rmSync(backupDir, { recursive: true })
	}
	fs.cpSync(nextDir, backupDir, { recursive: true })
	console.log('Biztonsági másolat készült: .next-backup')

	// Feldolgozzuk a .next könyvtárat
	processDirectory(nextDir)

	console.log('Next.js projekt kódolás befejezve!')
	console.log('A .next könyvtár tartalmazza az obfuszkált kódot.')
	console.log('Az eredeti verzió megtalálható a .next-backup könyvtárban.')
}

// Script futtatása
obfuscateNextProject()
