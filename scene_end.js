Scenes["end"] = () => {
	setScene({
		title: "Ending...",
	})

	GlobalVars.guide.x = 100
	GlobalVars.guide.y = 100

	GlobalVars.guide.element.innerHTML = '( * o * )<br><br>[ Welp... ]'

	setTimeout(() => {
		GlobalVars.guide.element.innerHTML = '( * - * )'
	}, 2000)

	setTimeout(() => {
		GlobalVars.guide.element.innerHTML = '( * o * )<br><br>[ See ya... ]'
	}, 3000)

	setTimeout(() => {
		GlobalVars.guide.element.innerHTML = ') * - *)'
		GlobalVars.guide.update = frame => {
			GlobalVars.guide.x += 10
		}
	}, 4000)

	setTimeout(() => {
		GlobalVars.guide = null
		switchScene("start")
	}, 9000)
}