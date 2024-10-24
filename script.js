let buttonToggleTagStyling = $('#button-toggle-tag-styling');
let buttonToggleTextStyling = $('#button-toggle-text-styling');
let buttonFontFamily = $('#button-font-family');
let ulDropdownMenu = $('#ul-dropdown-menu');
let ulItemList = $('#ul-item-list');

let rowTagStyling = $('#row-tag-styling');
let rowTextStyling = $('#row-text-styling');



// let classDropdownItem = $('.dropdown-item');

const fontFamilies = [
    "Times New Roman",
    "Georgia",
    "Arial",
    "Helvetica",
    "Courier New",
    "Comic Sans MS",
    "Impact",
    "system-ui"
];

$(function () {
    let html = returnPillTextInput();
    ulItemList.html(html);
    prepareInputAddText();

    for (let fontFamily of fontFamilies) {
        let newItem = $('<li>').addClass('dropdown-item').css('font-family', fontFamily).text(fontFamily);
        if (fontFamily == 'Helvetica') {
            newItem.addClass('active');
            buttonFontFamily.css('font-family', fontFamily).text(fontFamily);
        }
        ulDropdownMenu.append(newItem);
    }

    ulDropdownMenu.on('click', '.dropdown-item', function (e) {
        e.preventDefault;
        let selectedValue = $(this).text();
        buttonFontFamily.css('font-family', selectedValue).text(selectedValue);
        ulDropdownMenu.children().removeClass('active');
        $(this).addClass('active');
    });
});

function reloadListItems() {
    let html = '';
    for (let item in listItems) {
        html += returnPillTextListItem(listItems[item], item);
    }
    html += returnPillTextInput();
    ulItemList.html(html);
    prepareInputAddText();
}

function returnPillTextInput() {
    pillTextInput = `
    <li class="list-group-item">
        <div class="input-group p-3">
            <input type="text" class="form-control" name="input-add-text" id="input-add-text" autocomplete="off">
            <button type="button" class="btn btn-dark" onclick="addListItem()" id="button-add-text"><i class="bi bi-plus-circle-fill"></i></button>
        </div>
    </li>
    `;
    return pillTextInput;
}

function returnPillTextListItem(text, index) {
    pillTextListItem = `
    <li class="list-group-item list-group-item-action d-flex">
        <span class="fw-semibold">${text}</span>
        <i class="bi bi-trash-fill text-danger ms-auto c-canclick" onclick="removeListItem(${index})"></i>
    </li>
    `;
    return pillTextListItem;
}
