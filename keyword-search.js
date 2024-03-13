// ==UserScript==
// @name         Aminos.ai Bot Search Filter
// @namespace    http://tampermonkey.net/
// @version      2024-03-13
// @description  Adds a search box to the Aminos.ai GUI to filter comments by keyword
// @author       You
// @match        https://app.aminos.ai/dashboard/bots
// @icon         https://www.google.com/s2/favicons?sz=64&domain=aminos.ai
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

function createSearchInput() {
    const blogComments = document.querySelectorAll('.blog-comments__item');
    const searchInput = document.createElement('input');
    searchInput.id = 'search-input';
    searchInput.placeholder = 'Search...';
    searchInput.style = 'padding:7px; margin-bottom:10px; display:block;';

    // Append the search box above the first blog-comments element
    const firstBlogComment = document.querySelector('.blog-comments__item');
    if (firstBlogComment) {
        firstBlogComment.parentElement.insertBefore(searchInput, firstBlogComment);
    } else {
        console.warn('No blog comments found to attach the search box.');
        return;
    }

    // Add event listener to handle input
    searchInput.addEventListener('input', function () {
        const searchTerm = this.value.toLowerCase();

        blogComments.forEach(comment => {
            const commentText = comment.textContent.toLowerCase();
            if (commentText.includes(searchTerm)) {
                comment.style.display = '';
                comment.classList.add("d-flex");
                comment.classList.add("p-3");
            } else {
                comment.style.display = 'none';
                comment.classList.remove("d-flex");
                comment.classList.remove("p-3");
            }
        });
    });
}

// Call the function to create the search input
createSearchInput();
})();
