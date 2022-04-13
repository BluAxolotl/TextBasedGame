Scenes["mid"] = () => {
	setScene({
		title: "Middle...",
	})

	repeat(5, async i => {
		// let local_box = new Entity(ui_box(DOUBLE_LINED, 21, 4, '*NEW OFFER: ACCEPT THIS BRAND NEW OFFER RIGHT NOW!!'))
		await wait(i*100)
		let local_box = new Entity(ui_box(SINGLE_LINED, 6, 6, "NO WAY!"))
		easeFunc(700, 'back', int => {
			local_box.x = (i*100)*int
			local_box.y = (i*100)*int
		})
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