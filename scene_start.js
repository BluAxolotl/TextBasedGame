Scenes["start"] = () => {
	setScene({
		title: "Beginning",
	})

	let local_box = new Entity(`[DENVER POLICE STATION TERMINAL] {term1}<span id="cmdout"></span><br>><input id="enter"></input>`)
	local_box.styles[1] = 'border-style: double;  width: 600px; height: 200px;'

	onKey(13, () => {
		let input = document.getElementById('enter')
		if (input == document.activeElement) {
			let cmd_out = document.getElementById('cmdout')
			let lines = cmd_out.innerHTML.split("<br>")
			let cPrint = (stuff) => {
				if (lines.length >= 11) {
					print(lines.length)
					let del_line = lines.shift()
					lines[0] = ""
					cmd_out.innerHTML = lines.join("<br>")
				}
				cmd_out.innerHTML += ('<br>'+stuff)
			}
			let args = input.value.split(" ")
			let cmd = args.shift()
			switch (cmd) {
				case 'TEST':
					cPrint("Loadings...")
					setTimeout(() => {switchScene("mid")}, 2000)
				break;
				case 'HELP':
					cPrint("Nope, you get no help...")
				break;
				case ('FUNC' || 'SINE'):
					if (local_box.shrink == null) { local_box.shrink = false }
					if (!local_box.shrink) {
						easeFunc(1000, 'ball', int => {
							let amp = -100
							local_box.styles[1] = `border-style: double;  width: ${600+(int*amp)}px; height: ${200+(int*amp)}px;`
						})
					} else {
						easeFunc(500, 'back', int => {
							let amp = 100
							local_box.styles[1] = `border-style: double;  width: ${500+(int*amp)}px; height: ${100+(int*amp)}px;`
						})
					}
					local_box.shrink = (!local_box.shrink)
				break;
				default:
					cPrint(`Invalid Command '${cmd}'`)
			}
			input.value = ""
		}
	})

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