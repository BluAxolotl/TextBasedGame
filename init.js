const FRAMERATE = 24
const print = console.log
const container = document.getElementById('container')

const DOUBLE_LINED = ["╔", "╗", "╚", "╝", "═", "║"]
const SINGLE_LINED = ["┌", "┐", "└", "┘", "─", "│"]
const HEAVY_LINED = ["┏", "┓", "┗", "┛", "━", "┃"]

var mouse_pos = [0,0]

var GlobalEntityHolder = []

class Entity {
	constructor(char = "*") {
		this.element = document.createElement('p')
		this.element.classList.add('entity', 'loading')
		this.element.innerHTML = char

		this.styles = ["position: absolute;"]

		this.x = 0
		this.y = 0
		this.z = 0

		this.update = null
		this.lifetime = 0

		this.hover_entity = null

		this.element.onmouseenter = e => { if (this.hover_entity != null) {this.hover_entity.styles[0] = "position: absolute; pointer-events: none;"} }
		this.element.onmouseleave = e => { if (this.hover_entity != null) {this.hover_entity.styles[0] = "position: absolute; pointer-events: none; display: none;"} }

		this.update_id = setInterval(() => {
			this.position = [this.x,this.y]
			this.element.style = `${this.styles.join(" ")} left: ${this.position[0]}px; top: ${this.position[1]}px; z-index: ${this.z};`
			if (this.update != null) { this.update(this.lifetime) }
			this.lifetime++
		}, FRAMERATE)

		GlobalEntityHolder.push(this)
		container.appendChild(this.element)
		setTimeout(() => {this.element.classList.remove('loading')}, 50)
	}

	setHover(entity) {
		this.hover_entity = entity
		this.hover_entity.styles[0] = "position: absolute; pointer-events: none; display: none;"
		this.hover_entity.z = this.z + 1
	}
}

/*
	BEST WEBSITE A BILLION YEARS
	-> https://easings.net/
*/

function easeOutBounce(x) {
	const n1 = 7.5625;
	const d1 = 2.75;

	if (x < 1 / d1) {
	    return n1 * x * x;
	} else if (x < 2 / d1) {
	    return n1 * (x -= 1.5 / d1) * x + 0.75;
	} else if (x < 2.5 / d1) {
	    return n1 * (x -= 2.25 / d1) * x + 0.9375;
	} else {
	    return n1 * (x -= 2.625 / d1) * x + 0.984375;
	}
}

function easeInOutBack(x) {
	const c1 = 1.70158;
	const c2 = c1 * 1.525;

	return x < 0.5
	  ? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
	  : (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
}

function easeOutElastic(x) {
	const c4 = (2 * Math.PI) / 3;

	return x === 0
	  ? 0
	  : x === 1
	  ? 1
	  : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
}

const easeFuncs = {
	sine: (x) => { return -(Math.cos((Math.PI*x))-1)/2 },
	ball: easeOutBounce,
	back: easeInOutBack,
	expo: (x) => { return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; },
	elas: easeOutElastic,
}

function easeFunc(duration, type, func) {

	let i = 0
	let funcid = setInterval(() => {
		let float = i/100
		let int = easeFuncs[type](float)
		func(int)
		i++
	}, Math.floor(duration/100))

	return new Promise((res, rej) => { setTimeout(() => { clearInterval(funcid); res() }, duration) })
}

function repeat(amount, func) {
	for (let i = 0; i < amount; i++) {
		func(i)
	}
}

function grid(char, x, y) {
	let columns = []
	repeat(y, (x_i) => {
		let row = []
		repeat(x, (y_i) => {
			row.push(char)
		})
		columns.push(row.join(""))
	})
	return columns.join("<br>")
}

function ui_box(char_set, buffer_x, y, text = "") {
	let x = buffer_x * 2
	let i = 0
	let columns = []
	repeat(y, (y_i) => {
		let row = []
		repeat(x, (x_i) => {
			let pushing_char = ' '
			if (x_i == 0 && y_i == 0) {
				pushing_char = (char_set[0])
			} else if (x_i == (x-1) && y_i == 0) {
				pushing_char = (char_set[1])
			} else if (x_i == 0 && y_i == (y-1)) {
				pushing_char = (char_set[2])
			} else if (x_i == (x-1) && y_i == (y-1)) {
				pushing_char = (char_set[3])
			} else if (y_i == 0 || y_i == (y-1)) {
				pushing_char = (char_set[4])
			} else if (x_i == 0 || x_i == (x-1)) {
				pushing_char = (char_set[5])
			}

			if (x_i > 0 && y_i > 0 && x_i < (x-1) && y_i < (y-1)) {
				if (text[i] != null) {
					pushing_char = (text[i])
				}
				i++
			}

			row.push(pushing_char)
		})
		columns.push(row.join(""))
	})
	return columns.join("<br>")
}

document.body.onmousemove = e => {
	mouse_pos = [e.clientX, e.clientY]
}

var KeyDownTimer = {}
var KeyListeners = {}

document.onkeyup = e => {
	KeyDownTimer[e.which] = 0
}

document.onkeydown = e => {
	if (KeyDownTimer[e.which] == null) {
		KeyDownTimer[e.which] = 1
	} else {
		KeyDownTimer[e.which]++
	}

	if (KeyDownTimer[e.which] == 1 && Array.isArray(KeyListeners[e.which])) {
		KeyListeners[e.which].forEach(func => {
			func()
		})
	}
}

function onKey(key, func) {
	if (!Array.isArray(KeyListeners[key])) {
		KeyListeners[key] = []
	}

	KeyListeners[key].push(func)

	print(KeyListeners[key])
}

function setScene(object) {
	document.title = `Chat Rooms - ${object.title}`
}

var Scenes = {}
var GlobalVars = {}
const scene_names = ["start", "mid"]

function wait(milisec) {
	return new Promise((res, rej) => {
		setTimeout(() => {
			res()
		}, (milisec))
	})
}

function switchScene(scene_name) {
	print(Object.values(GlobalVars))
	GlobalEntityHolder.forEach(entity => {
		let event_properties = Object.values(entity.element).filter(i => i.startsWith("on"))
		entity.element.onclick = null
		if (!Object.values(GlobalVars).includes(entity)) {
			clearInterval(entity.update_id)
			entity.element.remove()
		}
	})
	Scenes[scene_name]()
}

scene_names.forEach((script, i) => {
	let script_elem = document.createElement('script')
	script_elem.src = `scene_${script}.js`
	document.body.appendChild(script_elem)
})

setTimeout(() => { switchScene("start") }, 20)