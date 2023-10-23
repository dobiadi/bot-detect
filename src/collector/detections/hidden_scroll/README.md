# Detect if the browser doesn't show vertical scrollbars persistently

This check originates from Modernizr (https://github.com/Modernizr/Modernizr).

It creates a taller div inside a smaller one and checks if the outer div has the
same ``clientWidth`` and ``outerWidth``. If not that means a vertical scrollbar
was added to the div by the browser.

This is not a very interesting check in itself as there are countless scenarios
where lacking a persistent scrollbar is normal. The best examples are phones
where there isn't a persistent scrollbar on the side to preserve space.

But there are cases where it might be an indicator of a headless browser. So
it can be used in combination with other checks.
