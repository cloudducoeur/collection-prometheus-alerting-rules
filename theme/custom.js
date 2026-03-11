// Force sidebar always visible & move search into navbar
(function() {
    // Ensure sidebar is always visible
    var body = document.body;
    body.classList.remove('sidebar-hidden');
    body.classList.add('sidebar-visible');

    var toggle = document.getElementById('sidebar-toggle-anchor');
    if (toggle) {
        toggle.checked = true;
        toggle.addEventListener('change', function(e) {
            e.preventDefault();
            this.checked = true;
            body.classList.remove('sidebar-hidden');
            body.classList.add('sidebar-visible');
        });
    }

    // Override localStorage to always keep sidebar visible
    try {
        localStorage.setItem('mdbook-sidebar', 'visible');
    } catch(e) {}

    // Move search bar INTO the menu bar, between title and right-buttons
    var menuBar = document.getElementById('menu-bar');
    var searchWrapper = document.getElementById('search-wrapper');
    var rightButtons = menuBar ? menuBar.querySelector('.right-buttons') : null;

    if (menuBar && searchWrapper && rightButtons) {
        // Remove hidden class
        searchWrapper.classList.remove('hidden');

        // Move the search form (input) into the menu bar
        var searchForm = document.getElementById('searchbar-outer');
        if (searchForm) {
            menuBar.insertBefore(searchForm, rightButtons);
        }

        // Move search results container outside menu bar, position it as overlay
        var searchResults = document.getElementById('searchresults-outer');
        if (searchResults) {
            // Create an overlay container for results
            var resultsOverlay = document.createElement('div');
            resultsOverlay.id = 'search-results-overlay';
            // Place it right after menu bar
            menuBar.parentNode.insertBefore(resultsOverlay, menuBar.nextSibling);

            // Move results header and list into overlay
            var resultsHeader = document.getElementById('searchresults-header');
            if (resultsHeader) resultsOverlay.appendChild(resultsHeader);
            var resultsList = document.getElementById('searchresults');
            if (resultsList) resultsOverlay.appendChild(resultsList);

            // Show/hide overlay based on search input
            var searchbar = document.getElementById('searchbar');
            if (searchbar) {
                var showResults = function() {
                    if (searchbar.value.trim().length > 0) {
                        resultsOverlay.classList.add('visible');
                    }
                };
                var hideResults = function() {
                    setTimeout(function() {
                        if (!resultsOverlay.contains(document.activeElement)) {
                            resultsOverlay.classList.remove('visible');
                        }
                    }, 200);
                };

                searchbar.addEventListener('input', showResults);
                searchbar.addEventListener('focus', showResults);
                searchbar.addEventListener('blur', hideResults);

                // Observe changes to results list to show overlay
                var observer = new MutationObserver(function() {
                    if (searchbar.value.trim().length > 0 && resultsList.children.length > 0) {
                        resultsOverlay.classList.add('visible');
                    }
                });
                observer.observe(resultsList, { childList: true });
            }
        }

        // Remove old search-wrapper (now empty or nearly empty)
        searchWrapper.style.display = 'none';
    }
})();
