setScene({
	title: "Beginning",
})

let guide = new Entity('( * - * )')
guide.x = 100
guide.y = 100
guide.element.onclick = e => {
	window.location.href = "file:///C:/Users/plush/Documents/Textbased%20Game%20Engine/end/index.html"
}

let guide_hover = new Entity(ui_box(SINGLE_LINED, 5, 3, 'What...'))
guide.setHover(guide_hover)
guide_hover.styles.push("background: #151515;")
guide_hover.update = (frame) => {
	guide_hover.x = mouse_pos[0]
	guide_hover.y = mouse_pos[1]
}