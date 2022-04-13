Scenes["mid"] = () => {
	setScene({
		title: "Middle...",
	})

	repeat(10, async i => {
		// let local_box = new Entity(ui_box(DOUBLE_LINED, 21, 4, '*NEW OFFER: ACCEPT THIS BRAND NEW OFFER RIGHT NOW!!'))
		await wait((i)/3)
		let local_box = new Entity(`[DENVER POLICE STATION TERMINAL] {term${i+1}}<br>><input></input>`)
		local_box.styles.push('border-style: double;  width: 350px; height: 45px;')
		local_box.y = i*50
		local_box.x = i*30
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