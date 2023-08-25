
	function about_images_case_setState(index) {

		let maxIndex = about_pagination_case.children.length - 1;

		if (index < 0) index = 0;
		else if (index > maxIndex) index = maxIndex;
		
		let i = 0;
		for (let element of about_pagination_case.children) {
			
			if (index === i) element.classList.add(about_class_radioAlreadyChecked);
			else element.classList.remove(about_class_radioAlreadyChecked);
			
			i++;
		}

		about_arrow_prev.classList.remove(about_class_arrowDisabled);
		about_arrow_next.classList.remove(about_class_arrowDisabled);

		if (index === 0) about_arrow_prev.classList.add(about_class_arrowDisabled);
		else if (index === maxIndex) about_arrow_next.classList.add(about_class_arrowDisabled);
	
		const parentX = about_images_case_parent.getBoundingClientRect().left;
		const childWidth  = about_images_case.children[index].getBoundingClientRect().width;
		let positionX = index * childWidth * -1;
		about_images_case.style["transform"] = `translateX(${positionX}px)`;
	}

	function about_pagination_currenIndex() {
		let i = 0;
		let index = 0;
		for (let element of about_pagination_case.children) {

			if (element.classList.contains(about_class_radioAlreadyChecked)) {
				index = i;
				break;
			}
			i++;
		};
		return index;
	}

	function about_pagination_click(e) {
		let target = e.target;
		if (target.classList.contains(about_class_radioAlreadyChecked)) return;
		let i = 0;
		let index = 0;
		for (let element of about_pagination_case.children) {

			if (element === target) {
				index = i;
				break;
			}
			i++;
		};
		about_images_case_setState(index);
	}

	function about_arrow_prev_click(e) {
		if (about_arrow_prev.classList.contains(about_class_arrowDisabled)) return;
		about_images_case_setState(about_pagination_currenIndex() - 1);
	}

	function about_arrow_next_click(e) {
		if (about_arrow_next.classList.contains(about_class_arrowDisabled)) return;
		about_images_case_setState(about_pagination_currenIndex() + 1);
	}

	const about_class_radioAlreadyChecked = 'about-carousel-paginations-custom-radio-checked';
	const about_class_arrowDisabled = 'about-carousel-carousel-arrows-disabled';
	const about_images_case_parent = document.querySelector('.about-carousel-carousel-images');
	const about_images_case = document.querySelector('.about-carousel-carousel-images-case');
	const about_pagination_case = document.querySelector('.about-carousel-paginations');
	const about_arrow_prev = document.querySelector('.about-carousel-carousel-arrows-prev');
	const about_arrow_next = document.querySelector('.about-carousel-carousel-arrows-next');

	for (let element of about_pagination_case.children) {
		element.addEventListener('click', about_pagination_click);
	};

	about_arrow_prev.addEventListener('click', about_arrow_prev_click);
	about_arrow_next.addEventListener('click', about_arrow_next_click);

	about_images_case_setState(0);
