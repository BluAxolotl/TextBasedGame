Scenes["start"] = () => {
	setScene({
		title: "Beginning",
	})

	let local_box = new Entity(`[DENVER POLICE STATION TERMINAL] {term1}<br>><input id="enter"></input>`)
	local_box.styles[1] = 'border-style: double;  width: 600px; height: 200px;'
	local_box.update = frame => {
		let input = document.getElementById('enter')
	}
	document.onkeydown = e => {
		if (e.which == 13 && document.activeElement == local_box.element) {
			switch (input.value) {
				case 'TEST':
					switchScene("mid")
				break;
				case 'SINE':
					local_box.styles[1] = `border-style: double;  width: 600px; height: 200px;`
				break;
			}
		}
	}

	// GlobalVars.guide = new Entity('Initializing...<br><br>Denver Police Station Terminal 1992-2022 ©<br>> <input placeholder="..." style="width: 260px;"></input>'.toUpperCase())
	// GlobalVars.guide.x = 10
	// GlobalVars.guide.y = 10

	// let guide_hover = new Entity(ui_box(DOUBLE_LINED, 6, 3, 'What...'))
	// GlobalVars.guide.setHover(guide_hover)
	// guide_hover.styles.push("background: #00177D;")
	// guide_hover.update = (frame) => {
	// 	guide_hover.x = mouse_pos[0]
	// 	guide_hover.y = mouse_pos[1]
	// }
}