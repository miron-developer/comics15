export const ContentElem = document.querySelector('.content');

export const CleanContent = whatClear => whatClear.innerHTML = '';
export const WriteContent = (insertHtml = '', where = ContentElem) => {
    CleanContent(where);
    where.insertAdjacentHTML('beforeend', insertHtml);
}