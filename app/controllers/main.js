getProducts();

function getProducts(searchProduct) {
  apiGetProducts(searchProduct)
    .then((response) => {
      let products = response.data;
      products.map((product) => {
        return new Products(product.id, product.name, product.price, product.screen, product.backCamera, product.frontCamera, product.img, product.desc, product.type);
      })
      display(products);
    })
    .catch((error) => {
      console.log(error);
    })
}

function display(products) {
  let productHtml = products.reduce((result, value, index) => {
    return result + `
      <tr>
        <td>${index + 1}</td>
        <td>${value.name}</td>
        <td>${value.price}</td>
        <td>
          <img src="${value.img}" width="60px" height="auto">
        </td>
        <td>${value.desc}</td>
        <td>
          <button 
          class="btn btn-success" 
          data-toggle="modal"
          data-target="#myModal"
          data-type="edit"
          data-id="${value.id}"
          >
            Sửa
          </button>

          <button 
          class="btn btn-danger" 
          data-type="delete"
          data-id="${value.id}"
          >
            Xoá
          </button>
        </td>
      </tr>
    `
  }, '');

  dom('#tblDanhSachSanPham').innerHTML = productHtml;
}

function addProduct(product) {
  apiAddProduct(product)
    .then(() => {
      getProducts();
    })
    .catch((error) => {
      console.log(error);
    })
}

function removeProduct(productId) {
  apiRemoveProduct(productId)
    .then(() => {
      getProducts();
    })
    .catch((error) => {
      console.log(error);
    })
}

function selectProduct(productId) {
  apiGetProductById(productId)
    .then((response) => {
      let product = response.data;

      dom('#productCode').value = product.id;
      dom('#name').value = product.name;
      dom('#price').value = product.price;
      dom('#screen').value = product.screen;
      dom('#backCamera').value = product.backCamera;
      dom('#frontCamera').value = product.frontCamera;
      dom('#image').value = product.img;
      dom('#type').value = product.type;
      dom('#desc').value = product.desc;

    })
    .catch((error) => {
      console.log(error);
    })
}

function updateProduct(id, product) {
  aptUpdateProduct(id, product)
    .then(() => {
      getProducts();
    })
    .catch((error) => {
      console.log(error);
    })
}


function clearForm() {
  dom('#name').value = '';
  dom('#price').value = '';
  dom('#screen').value = '';
  dom('#backCamera').value = '';
  dom('#frontCamera').value = '';
  dom('#image').value = '';
  dom('#type').value = '';
  dom('#desc').value = '';
}

function dom(selector) {
  return document.querySelector(selector);
}

dom('#btnThemSanPham').addEventListener('click', () => {
  dom('.modal-title').innerHTML = 'Thêm sản phẩm';
  dom('.modal-footer').innerHTML = `
    <button class="btn btn-success" data-type="add">Thêm</button>
    <button class="btn btn-danger" class="close" data-dismiss="modal" >Huỷ</button>
  `
  clearForm();
})

dom('.modal-footer').addEventListener('click', (evt) => {
  let typeFunction = evt.target.getAttribute('data-type');

  let id = dom('#productCode').value;
  let name = dom('#name').value;
  let price = dom('#price').value;
  let screen = dom('#screen').value;
  let backCamera = dom('#backCamera').value;
  let frontCamera = dom('#frontCamera').value;
  let img = dom('#image').value;
  let desc = dom('#desc').value;
  let type = dom('#type').value;

  let isValid = validateForm();
  if (!isValid) return

  let product = new Products(null, name, price, screen, backCamera, frontCamera, img, desc, type);
  clearForm();
  if (typeFunction === 'add') {
    addProduct(product);
  } else if(typeFunction === 'update') {
    updateProduct(id, product);
  }
})

dom('#tblDanhSachSanPham').addEventListener('click', (evt) => {
  let typeFunction = evt.target.getAttribute('data-type');
  let productId = evt.target.getAttribute('data-id');
  if (typeFunction === 'delete') {
    removeProduct(productId);
  } else if (typeFunction === 'edit') {
    
    dom('.modal-title').innerHTML = 'Thêm sản phẩm';
    dom('.modal-footer').innerHTML = `
      <button class="btn btn-success" data-type="update">Cập nhật</button>
      <button class="btn btn-danger" class="close" data-dismiss="modal">Huỷ</button>
    `

    selectProduct(productId);


  }
})

dom('#search').addEventListener('keydown', (evt) => {
  if (evt.key === 'Enter') {
    return
  }

  getProducts(evt.target.value);
})

function validateProductName() {
  let name = dom("#name").value;
  let noti = dom("#tbId");

  if (!name) {
    noti.innerHTML = "Tên sản phẩm không được để trống";
    return false;
  }
  noti.innerHTML = "";
  return true;
}

function validateProductPrice() {
  let price = dom('#price').value;
  let noti = dom('#tbName');

  if (!price) {
      noti.innerHTML = 'Giá không để trống';
      return false;
  }

  if (isNaN(price)) {
    noti.innerHTML = 'Giá phải là số';
      return false;
  }

  noti.innerHTML = '';
  return true;
}

function validateProductScreen() {
  let screen = dom("#screen").value;
  let noti = dom("#tbPw");

  if (!screen) {
    noti.innerHTML = "Screen không được trống";
    return false;
  }

  noti.innerHTML = "";
  return true;
}

function validateProductBackCamera() {
  let backCamera = dom("#backCamera").value;
  let noti = dom("#tbEmail");

  if (!backCamera) {
    noti.innerHTML = "Camera sau không được trống";
    return false;
  }

  noti.innerHTML = "";
  return true;
}

function validateProductFrontCamera() {
  let screen = dom("#frontCamera").value;
  let noti = dom("#tbfrontCamera");

  if (!screen) {
    noti.innerHTML = "Camera trước không được trống";
    return false;
  }

  noti.innerHTML = "";
  return true;
}

function validateProductImage() {
  let img = dom("#image").value;
  let noti = dom("#tbImg");

  if (!img) {
    noti.innerHTML = "Ảnh không được trống";
    return false;
  }

  noti.innerHTML = "";
  return true;
}

function validateProductTypeProduct() {
  let type = dom("#type").value;
  let noti = dom("#tbNN");

  if (!type) {
    noti.innerHTML = "Loại sản phẩm không được trống";
    return false;
  }

  noti.innerHTML = "";
  return true;
}

function validateProductDesc() {
  let desc = dom("#desc").value;
  let noti = dom("#tbMt");

  if (!desc) {
    noti.innerHTML = "Mô tả không được trống";
    return false;
  }

  if(desc.length > 60) {
    noti.innerHTML = "Mô tả không được quá 60 ký tự";
    return false;
  }
  noti.innerHTML = "";
  return true;
}

function validateForm() {
  let isValid = true;
  isValid =
    validateProductName() &
    validateProductPrice() &
    validateProductScreen() &
    validateProductBackCamera() &
    validateProductFrontCamera() &
    validateProductImage() &
    validateProductTypeProduct() & 
    validateProductDesc()
    ;

  if (!isValid) {
    return false;
  }
  return true;
}