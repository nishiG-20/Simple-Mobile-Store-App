showNavbar()

function showNavbar() {

	//Grab The Id of Navbar TO Display
	let nav = document.getElementById('Navbar')
	let navbar = makeNavbar()

	nav.innerHTML = navbar
}


function makeNavbar() {
	let navBody = `
                   <nav class="navbar navbar-expand-lg navbar-light bg-light">
                   <div class="container-fluid">
                     <a class="navbar-brand" href="#">MobileStore</a>
                     <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                       <span class="navbar-toggler-icon"></span>
                     </button>
                     <div class="collapse navbar-collapse" id="navbarSupportedContent">
                       <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                         <li class="nav-item">
                           <a class="nav-link active" aria-current="page" href="#" onclick="showMobiles()">Mobiles</a>
                         </li>
                         <li class="nav-item">
                           <a class="nav-link" href="#" onclick="addMobiles()">Add a Mobile</a>
                         </li>
                         <li class="nav-item">
                           <a class="nav-link" href="#" onclick="showCart()">Cart</a>
                         </li>
                       </ul>
                     </div>
                   </div>
                 </nav>
                `
	return navBody
}

let mobilesData = [
	{ "image": "https://i.ibb.co/cLV4RvX/google-pixel-3.jpg", "RAM": ["8 GB"], "ROM": ["256 GB", "128 GB", "64 GB"], "name": "Pixel 3", "brand": "Google", "colors": ["Blue", "Black", "White"] },
	{ "image": "https://i.ibb.co/160YSpk/mi-redmi-5.jpg", "RAM": ["6 GB", "4 GB"], "ROM": ["128 GB", "64 GB"], "name": "Redmi 5", "brand": "Xiaomi", "colors": ["Red", "Gold", "Black", "White"] },
	{ "image": "https://i.ibb.co/y6dk6n1/mi-redmi-y2.jpg", "RAM": ["3 GB"], "ROM": ["32 GB"], "name": "Redmi Y2", "brand": "Xiaomi", "colors": ["Rose Gold", "Gold", "Black", "White"] },
	{ "image": "https://i.ibb.co/McQMDF8/motorola-moto-e5-plus.jpg", "RAM": ["6 GB"], "ROM": ["128 GB", "64 GB"], "name": "Moto E5 Plus", "brand": "Motorola", "colors": ["Grey", "Black", "Pink"] },
	{ "image": "https://i.ibb.co/1QGFW28/nokia-6-1.jpg", "RAM": ["6 GB"], "ROM": ["128 GB"], "name": "6.1", "brand": "Nokia", "colors": ["Grey", "Black", "Blue"] },
	{ "image": "https://i.ibb.co/vJbK6qM/realme-c1.jpg", "RAM": ["6 GB", "4 GB", "3 GB"], "ROM": ["128 GB", "64 GB"], "name": "C1", "brand": "Realme", "colors": ["Red", "Gold", "Black", "White", "Grey"] },
	{ "image": "https://i.ibb.co/F6c80H6/realme-x.jpg", "RAM": ["4 GB", "3 GB"], "ROM": ["64GB", "32 GB"], "name": "X", "brand": "Realme", "colors": ["Rose Gold", "Gold", "Black", "White", "Pink"] },
	{ "image": "https://i.ibb.co/TWLNRyW/samsung-galaxy-s10-plus.jpg", "RAM": ["6 GB", "4 GB"], "ROM": ["64 GB"], "name": "Galaxy S10", "brand": "Samsung", "colors": ["Red", "Gold", "White"] },
	{ "image": "https://i.ibb.co/ScZsMtW/vivo-z1-pro.jpg", "RAM": ["8 GB", "6 GB"], "ROM": ["128 GB", "64 GB"], "name": "Z1 Pro", "brand": "Vivo", "colors": ["White", "Deep Blue"] }
]



let ramOptions = ["8 GB", "6 GB", "4 GB", "3 GB", "2 GB"]

let romOptions = ["256 GB", "128 GB", "64 GB", "32 GB", "16 GB"]

let colorsArr = ["Rose Gold", "Gold", "Black", "Grey", "White", "Red", "Pink", "Blue", "Deep Blue"]

let brands = ["Google", "Samsung", "Oppo", "Nokia", "Xiaomi", "Realme", "Apple"]

let shwImg = -1

let cartItems = []

let prevID = ''

let errorDetails = {}

let editIndex = -1

let editItems = {}


//Show Mobile Data

function showMobiles() {
	//Clear The Screen
	let clrScr = document.getElementById('addMobile')
	clrScr.innerHTML = ''
	
	let clrscr2=document.getElementById('cart')
	clrscr2.innerHTML=''

	//Grab The Id 
	let shwMob = document.getElementById('shwMob')
	let makeTheMobile = MakeMobile()
	shwMob.innerHTML = makeTheMobile
}

//Make Mobile Data

function MakeMobile() {

	let mobileInfo = mobilesData.map((mb, index) => {
		//Destrucure The Property of Mobile
		let { image, RAM, ROM, name, brand, colors } = mb

		let Image = `<img src="${image}" class="img-fluid p-4" alt="${'image' + index}">`

		let Colors = colors.map(clr => clr)

		let MobRAM = RAM.map(ram => ram)

		let MobROM = ROM.map(rom => rom)


		return `
					<div class="row">
					   <div class="col bdCol" onclick="showBigImage(${index})">
						  ${Image}
						  <div class="float-end">
							<p>Name:${name}</p>
							<p>Brand:${brand}</p>
							<p>Colors:${Colors}</p>
							<p>RAM:${MobRAM}</p>
							<p>ROM:${MobROM}</p>
						  </div>
					   </div>
					   <div class="col" id="${'id' + index}">
					   </div>
					</div>
				   `

	})

	return `<div class="container my-4 bdRow">${mobileInfo.join('')}</div>`
}


//Show Big Image 
function showBigImage(index) {

	//using this condtion we can see one mobile information at a time or 1 at a time.
	let CurId = document.getElementById(`${'id' + index}`)
	if (prevID !== '') {
		prevID.innerHTML = ''
		prevID = CurId
	} else {
		prevID = CurId
	}

	//Make Image
	let img = `<img src="${mobilesData[index].image}" class="rounded mx-auto d-block my-4" alt="Big Image">`

	//Complete Phone name With Brand
	let phnname = `<h2 align="center">${mobilesData[index].name} from ${mobilesData[index].brand}</h2>`

	//Make RAM,ROM and Color DropDown

	//Make RAM DropDown
	let RAMDpDown = makeDpDown('Select RAM', mobilesData[index].RAM, 'PhnRAM')


	//Make ROM DropDown
	let ROMDpDown = makeDpDown('Select ROM', mobilesData[index].ROM, 'PhnROM')


	//Make Colors DropDown
	let ColorDpDown = makeDpDown('Select Color', mobilesData[index].colors, 'PhnColor')


	//Arrange Above Three DropDown In a Row

	let DropDowns = `
	                <div class="row">
					   <div class="col">
					      ${RAMDpDown}
					   </div>
					   <div class="col">
					      ${ROMDpDown}
					   </div>
					   <div class="col">
					      ${ColorDpDown}
					   </div>
					</div>
	              `

	//Submit Button
	let submitButtons = `<div class="my-2 text-center">
	                         <button type="button" class="btn btn-primary" onclick="AddToCart(${index})">Add To Cart</button>
	                     </div>`

	//Edit Buttons
	let editButtons = `<div class="my-2 text-center">
	                         <button type="button" class="btn btn-secondary" onclick="editMobile(${index})">Edit Mobile</button>
	                     </div>`


	//Complete Big Image Details
	let compltBigImageDtls = img + phnname + DropDowns + submitButtons + editButtons

	//show the Big Image
	let imgPos = document.getElementById('id' + index)
	imgPos.innerHTML = compltBigImageDtls

}

//We are using This function to create (RAM,ROM AND COLOR) DropDown...and Also using For some (Add A product Functions)

function makeDpDown(label, arr, id, err = '', EditBrand = '') {

	let errStr = (err) ? `<span class="rdClr mb-2">${err}</span>` : ''

	let DpDownBody = arr.map(val => {
		return `<option value="${val}">${val}</option>`
	})

	let selectedHeader = (EditBrand) ? EditBrand : label

	let DpDownheader = `<option disabled selected>${selectedHeader}</option>`

	let cmpltDpDown = `
	                 <select class="form-select" id="${id}">
					    ${DpDownheader}
	                    ${DpDownBody.join('')}
                     </select>
	                `
	return cmpltDpDown + errStr
}


//Add The value To The Cart
function AddToCart(index) {

	//Grab The RAM With value with id
	let selectedRAM = document.getElementById('PhnRAM').value

	//Grab The ROM With value with id
	let selectedROM = document.getElementById('PhnROM').value

	//Grab The Color Value With id
	let selectedColor = document.getElementById('PhnColor').value


	//Check RAM value
	let index1 = ramOptions.findIndex(val => val === selectedRAM)

	//Check ROM value
	let index2 = romOptions.findIndex(val => val === selectedROM)

	//Change Color Value
	let index3 = colorsArr.findIndex(val => val === selectedColor)

	if (index1 < 0 || index2 < 0 || index3 < 0) {

		alert('Choose All the Options Before Adding To The cart')

	} else if (cartItems.length < 1 || checkCartItems(index)) {

		//Push in to The Cart
		let item = {}

		item.image = mobilesData[index].image
		item.brand = mobilesData[index].brand
		item.name = mobilesData[index].name
		item.RAM = selectedRAM
		item.ROM = selectedROM
		item.color = selectedColor

		cartItems.push(item)
		alert('Successully added to Cart')

	} else {
		//grab name
		let name = mobilesData[index].name
		alert(name + ' has already been added To Cart')
	}
}

//Here We are using This Function to Check that Cart Element is Repeating or not
function checkCartItems(index) {
	//grab name
	let checkName = mobilesData[index].name

	//here We are Checking phone is present in Cart or not
	let findIndex = cartItems.findIndex(elem => elem.name === checkName)

	if (findIndex < 0) {
		return 1
	} else return 0

}

//We are using this variable for that codition
//If we have one Entry left on a DOM and We want to clear the DOM

let clr = 'false'

function showCart() {
	//First Clear Screen
	let clrSc1 = document.getElementById('addMobile')
	clrSc1.innerHTML = ''

	let clrScr2 = document.getElementById('shwMob')
	clrScr2.innerHTML = ''


	let cartBody = ''

	if (cartItems.length < 1) {

		if (clr === 'true') {
			document.getElementById('cart').innerHTML = ''
		}
		return alert('Cart is Empty!')
	} else {
		clr = 'true'
		cartBody = cartItems.map((cb, index) => {
			//Destructure The Cart Elements
			let { image, name, brand, RAM, ROM, color } = cb
			return `
					<div class="row justify-content-center pinkBdr">
					   <div class="col-4">
					      <img src="${image}" class="img-fluid p-4" alt="phn Image">
					    </div>
					    <div class="col-4 my-4">
						<div class="float-end">
					    	 <p align="center">${name} from ${brand}</p>
					    	 <p>Color:${color},RAM:${RAM},ROM:${ROM}</p>
							 <div class="text-center">
							   <button  type="button" class="btn btn-danger" onclick="RemoveFromCart(${index})">Remove From Cart</button>
							 </div>
					     </div>
					    </div>
			   	    </div>
				
			       `
		})
	}

	let hd = `<p>Number of Items in Cart: ${cartItems.length}</p>`

	let completeCart = `
	                  <div class="container my-4">
					  ${hd}
					  ${cartBody.join('')}
					  </div>
	                 `
	//Grab The id
	let shwCart = document.getElementById('cart')
	shwCart.innerHTML = completeCart
}

//Remove The Value From Cart
function RemoveFromCart(index) {
	cartItems.splice(index, 1)
	showCart()
}


//Edit Mobile Info
function editMobile(index) {
	editIndex = index
	editItems = mobilesData[index]
	addMobiles()
}


//Add Mobile 
function addMobiles() {
	//Clear The Screen
	let clrScr = document.getElementById('shwMob')
	clrScr.innerHTML = ''

	let clrscr2=document.getElementById('cart')
	clrscr2.innerHTML=''

	//Create Form To add Mobile
	let createTheForm = createForm()

	//Grab The Id
	let formPos = document.getElementById('addMobile')
	formPos.innerHTML = createTheForm
}


function createForm() {

	let { image = '', name = '', brand = '', RAM = [], ROM = [], colors = [] } = editItems


	let mainHeading = (editIndex >= 0) ? `<h1 class="my-3">Edit Details</h1>` : `<h1 class="my-3">Add A new product</h1>`


	//Product name Field 
	let input = makeTextField('prodName', 'product Name', 'Enter product Name', errorDetails.name, name)

	//Product image Field
	let ProductImage = makeTextField('prodImg', 'product Image', 'Enter product image', errorDetails.image, image)

	//Brand
	let brandDpDOwn = makeDpDown('Select Brand', brands, 'bd', errorDetails.brand, brand)


	//Choose RAM  of the phone
	let RAMhd = `<p class="my-2">Choose RAM options</p>`
	let makeTheRAMCheckBoxes = makeCheckBoxes(ramOptions, 'RAMopt', errorDetails.RAM, RAM)
	let completeRAM = RAMhd + makeTheRAMCheckBoxes

	//Choose Rom Of the phone

	let ROMhd = `<p class="my-2">Choose ROM options</p>`
	let makeTheROMCheckBoxes = makeCheckBoxes(romOptions, 'ROMopt', errorDetails.ROM, ROM)
	let completeROM = ROMhd + makeTheROMCheckBoxes

	//Choose The Color Of The Phone
	let Colorhd = `<p class="my-2">Choose Color options</p>`
	
	let makeTheCOLORCheckboxes = makeCheckBoxes(colorsArr, 'COLORopt', errorDetails.colors,colors)
	
	let completeColor = Colorhd + makeTheCOLORCheckboxes

	//Submit The product
	let addProduct = `<button type="button" class="btn btn-primary" onclick="submitNewProduct()">Add product</button>`



	return `
	         <div class="container">
			   ${mainHeading}
			   ${input}
			   ${ProductImage}
			   ${brandDpDOwn}
			   ${completeRAM}
			   ${completeROM}
			   ${completeColor}
			   ${addProduct}
			 </div>
	       `
}


function makeTextField(id, label, placeholder, err = '', EditInfo = '') {
	let errStr = (err) ? `<span class="rdClr">${err}</span>` : ''

	return `
	         <div class="mb-3">
	             <label for="${id}" class="form-label">${label}</label>
	             <input type="text" class="form-control" id="${id}" value="${EditInfo}" placeholder="${placeholder}">
				 ${errStr}
             </div>
	       `
}


function makeCheckBoxes(arr, name, err = '', editArr = []) {


	//We are writing this condition for changing line in case of colors.
	//Bcoz we want to maintain Gap b/w final Submit button which is (Add a product)

	let chngLine = ''
	if (name === 'COLORopt' && err) {
		chngLine = '</br>'
	}

	let errStr = (err) ? `<span class="rdClr mb-2">${err}</span>${chngLine}` : ''

	let chKBoxes = arr.map((opt, index) => {

		//We are using this condition for Edit info purpose.
		let selected = ''
		if (editArr.length >= 1) {
			let index = editArr.findIndex(elem => elem === opt)
			selected = (index >= 0) ? 'checked' : ''
		}

		return `
		         <div class="form-check">
		             <input class="form-check-input" type="checkbox" value="${opt}" name="${name}" id="${'chkid' + index}" ${selected}>
		             <label class="form-check-label" for="${'chkid' + index}">
					    ${opt}
		             </label>
	             </div>
		       `
	})
	return chKBoxes.join('') + errStr
}


function submitNewProduct() {
	//Grab Entered Product name
	let productName = document.getElementById('prodName').value

	//Grab The Entered Product image
	let productImage = document.getElementById('prodImg').value

	//Grab The Entered Brand Name
	let brandName = document.getElementById('bd').value

	let RAM = []

	//Grab The Entered RAM options by user
	let chkdRAM = document.getElementsByName('RAMopt')
	for (let i = 0; i < chkdRAM.length; i++) {
		if (chkdRAM[i].checked) {
			RAM.push(chkdRAM[i].value)
		}
	}

	let ROM = []

	//Grab The Entered ROM options by user
	let chkdROM = document.getElementsByName('ROMopt')
	for (let i = 0; i < chkdROM.length; i++) {
		if (chkdROM[i].checked) {
			ROM.push(chkdROM[i].value)
		}
	}

	let color = []

	//Grab The Entered Colors options by user
	let chkdCOLOR = document.getElementsByName('COLORopt')
	for (let i = 0; i < chkdCOLOR.length; i++) {
		if (chkdCOLOR[i].checked) {
			color.push(chkdCOLOR[i].value)
		}
	}

	let newProduct = { "image": productImage, "RAM": RAM, "ROM": ROM, "name": productName, "brand": brandName, "colors": color }

	if (validateMobileDetails(newProduct)) {
		(editIndex >= 0) ? mobilesData[editIndex] = newProduct : mobilesData.push(newProduct)
		showMobiles()

		//Clear All The value of Form After Submit
		editItems = {}
		editIndex = -1
	} else {
		editItems = newProduct
		addMobiles()
	}

}

function validateMobileDetails(product) {
	//validate Image
	errorDetails.image = (product.image) ? '' : 'Product Image is Mandatory'

	//Vaidate name
	errorDetails.name = (product.name) ? '' : 'Product Name is Mandatory'

	//validate Brand
	let findBrandIndex = brands.findIndex(bd => bd === product.brand)

	errorDetails.brand = (findBrandIndex === -1) ? 'Brand Is Mandatory' : ''

	//validate RAM
	errorDetails.RAM = (product.RAM.length < 1) ? 'At least 1 RAM option should be checked.' : ''

	//validate ROM
	errorDetails.ROM = (product.ROM.length < 1) ? 'At least 1 ROM option should be checked.' : ''

	//validate Color
	errorDetails.colors = (product.colors.length < 1) ? 'At least 1 Color option should be checked.' : ''

	return !(errorDetails.image || errorDetails.name || errorDetails.brand || errorDetails.RAM || errorDetails.ROM || errorDetails.colors)

}

