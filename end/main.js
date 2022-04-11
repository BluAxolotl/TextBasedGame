setScene({
	title: "Ending...",
})

let guide = new Entity('( * - * )')
guide.x = 100
guide.y = 100

setTimeout(() => {
	guide.element.innerHTML = '( * o * )<br><br>[ Welp... ]'
}, 5000)

setTimeout(() => {
	guide.element.innerHTML = '( * - * )'
}, 6000)

setTimeout(() => {
	guide.element.innerHTML = '( * o * )<br><br>[ See ya... ]'
}, 9000)

setTimeout(() => {
	guide.element.innerHTML = ') * - *)'
	guide.update = frame => {
		guide.x += 10
	}
}, 10000)