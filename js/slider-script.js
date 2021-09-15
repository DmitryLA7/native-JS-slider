//Slider scripts
let sliderLine = document.querySelector('.slider__line'),
width = document.querySelector('.slider').offsetWidth,
slideInd = 1,
slides = document.querySelectorAll('.slider__img'),
switchBody = document.querySelector('.slider__switch_body'),
prev = document.querySelector('.prev'),
next = document.querySelector('.next')

//Добавление переключателей слайдера равным количеству элементов/картинок в слайдере
function addSwitch(){
	for (let i = 0; i < slides.length; i++) {
		let sliderSwitch = document.createElement('div')
		sliderSwitch.className += 'slider__switch'
  		switchBody.appendChild(sliderSwitch)
	}
}
addSwitch()

//Клонирование слайдов для создания бесконечного слайдера
function cloneImg(){
	let firstSlide = slides[0],
	lastSlide = slides[slides.length - 1],
	cloneFirst = firstSlide.cloneNode(true),
	cloneLast = lastSlide.cloneNode(true),
	posInitial  = sliderLine.offsetLeft,
	slidesLength = slides.length

	//клонирование первого и последнего слайда
	sliderLine.appendChild(cloneFirst)
	sliderLine.insertBefore(cloneLast, firstSlide)
	slides = document.querySelectorAll('.slider__img')
	prev.addEventListener('click', prevSlide)
	function prevSlide(){
		shiftSlide(-1)
	}
	next.addEventListener('click', nextSlide)
	function nextSlide(){
		shiftSlide(1)
	}

	function shiftSlide(n){
		posInitial = sliderLine.offsetLeft
		
		if(n == -1){
			prev.removeEventListener('click', prevSlide)
			let slidePosition = sliderLine.offsetLeft
			let maxMove = -width * (slideInd - 1)	
			let slideInterval = setInterval(frameLeft, 0)
			let start = Date.now()
			function frameLeft(){
				slidePosition = (slidePosition + 10)
				/*Скорость прокрутки предыдущего слайдера, если надо потестить кнопку, 
				то уменьшаем значение - так нагляднее
				Например: slidePosition = (slidePosition + 5), достойная скорость, которая не позволит уснуть
				*/			
				sliderLine.style.left = slidePosition + 'px'
				if (slidePosition >= (maxMove)){
					sliderLine.style.left = `${-width * slideInd}px`
					slidePosition = 0
					maxMove = 0
					clearInterval(slideInterval)
					prev.addEventListener('click', prevSlide)
					return
				}
				if(slideInd == 0){
				 	sliderLine.style.left = -(width) * (slides.length - 2) + 'px'
					slideInd = slides.length - 2
				}
				
			}
			slideInd = slideInd - 1
			replaceSwitch(slideInd)
		}else if (n == 1){
			next.removeEventListener('click', nextSlide)
			let slidePosition = sliderLine.offsetLeft
			let maxMove = -width * (slideInd + 1)	
			let slideInterval = setInterval(frameRight, 0)
			let start = Date.now()
			function frameRight(){
				slidePosition = (slidePosition - 10)/*Скорость прокрутки следующего слайдера, если надо потестить кнопку, 
				то уменьшаем значение - так нагляднее
				Например: slidePosition = (slidePosition - 5), достойная скорость, которая не позволит уснуть
				*/	
				sliderLine.style.left = slidePosition + 'px'
				if (slidePosition <= (maxMove)){
					sliderLine.style.left = `${-width * slideInd}px`
					slidePosition = 0
					maxMove = 0
					clearInterval(slideInterval)
					next.addEventListener('click', nextSlide)
					return
				}
				if(slideInd == slides.length - 1){
				 	sliderLine.style.left = -(1 * width) + 'px'
					slideInd = 1
				}
			}
			slideInd = slideInd + 1
			replaceSwitch(slideInd)
		}
	}
}

cloneImg()

//------------//

function currentSlide(n) {
    showSlide(slideInd = n)
}

function initSlider(){
	width = document.querySelector('.slider').offsetWidth
	sliderLine.style.width = width * slides.length + 'px'
	slides.forEach(item => {
		item.style.width = width + 'px'
		item.style.height = 'auto'
	})
	sliderRoll(slideInd)
}

window.addEventListener('resize', initSlider)
initSlider()

//Кнопочки под слайдером
let switchBtn = document.querySelectorAll('.slider__switch')
let swtArr = []
switchBtn[slideInd - 1].className += ' active'
function initSwitch(){
	for (let i = 0; i < switchBtn.length; i++) {
		swtArr.push(switchBtn[i])	
		
		switchBtn[i].addEventListener('click', function(e){
			let n = swtArr.indexOf(e.target)
			switchMove(n + 1, n)
		})
	}
}
initSwitch()

function replaceSwitch(){
	if(slideInd >= slides.length - 1){
		switchBtn[0].className += ' active'
		switchBtn[switchBtn.length - 1].className = switchBtn[switchBtn.length - 1].className.replace(' active', '')
		return
	}else if(slideInd <= 0){
		switchBtn[0].className = switchBtn[0].className.replace(' active', '')
		switchBtn[switchBtn.length - 1].className += ' active'
		return
	}
	for (i = 0; i < switchBtn.length; i++){
		switchBtn[i].className = switchBtn[i].className.replace(' active', '')
	}
	switchBtn[slideInd - 1].className += ' active'
}

function switchMove(currentInd, switchIndex){
	let i


	for (i = 0; i < switchBtn.length; i++){
		switchBtn[i].className = switchBtn[i].className.replace(' active', '')
	}
	switchBtn[currentInd - 1].className += ' active';
	slideInd = currentInd
	if(switchIndex == currentInd - 1){
		let slidePosition = sliderLine.offsetLeft
		let maxMove = -width * (currentInd)
		let slideInterval = setInterval(frame, 0)
		let start = Date.now()
		function frame(){
			slidePosition = (slidePosition + 10)
			/*Скорость прокрутки предыдущего слайдера, если надо потестить кнопку, 
			то уменьшаем значение - так нагляднее
			Например: slidePosition = (slidePosition + 5), достойная скорость, которая не позволит уснуть
			*/	
			sliderLine.style.left = slidePosition + 'px'
			if (slidePosition >= (maxMove)){
				sliderLine.style.left = `${-width * currentInd}px`
				slidePosition = 0
				maxMove = 0
				clearInterval(slideInterval)
				return
			}
		}
	}
	 if(switchIndex < currentInd){
		let slidePosition = sliderLine.offsetLeft
		let maxMove = -width * (currentInd)
		let slideInterval = setInterval(frame, 0)
		let start = Date.now()
		function frame(){
			slidePosition = (slidePosition - 10)
			/*Скорость прокрутки предыдущего слайдера, если надо потестить кнопку, 
			то уменьшаем значение - так нагляднее
			Например: slidePosition = (slidePosition - 5), достойная скорость, которая не позволит уснуть
			*/	
			sliderLine.style.left = slidePosition + 'px'
			if (slidePosition <= (maxMove)){
				sliderLine.style.left = `${-width * currentInd}px`
				slidePosition = 0
				maxMove = 0
				clearInterval(slideInterval)
				return
			}
		}
	}
}

function showSlide(n){
	let i

	if( n > slides.length - 1){
		slideInd = 0
	}
	if( n < 0){
		slideInd = slides.length
	}

	sliderRoll(n)
}

function sliderRoll(n){
	sliderLine.style.left = `${-width * slideInd}px`
}