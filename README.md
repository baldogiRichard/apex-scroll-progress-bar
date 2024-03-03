# APEX Scroll Progress Bar
This repository contains the files for the Scroll Progress Bar APEX Item Plug-in.

Minimum requirement: Oracle Application Expresss 19.1

This plug-in uses the <a href="https://rstacruz.github.io/nprogress/" rel="nofollow">NProgress.js</a> and the <a href="https://jeremenichelli.github.io/scrollProgress/" rel="nofollow">scrollProgress</a> JS library.

![image](https://github.com/baldogiRichard/apex-scroll-progress-bar/assets/100072414/d5adbbc9-bee1-4611-a03f-6bfa69aadbb1)

# setup

You can check each setup in my downloadable <a href="https://github.com/baldogiRichard/plug-in-site" rel="nofollow">Sample Application: APEX Plug-ins by Richard Baldogi</a>

This item plug-in creates a ProgressBar which tracks the scrolling of a designated element in the Page.
<br>
<br>
<b>Scroll tracking can be calculated from different positions:</b>
<ul>
    <li>Vertical Scrolling: Top to Bottom, Bottom to Top</li>
    <li>Horizontal Scrolling: Left to Right, Right to left</li>
</ul>
<b>The following JS calls can be used for the plugin:</b>
<br>
<br>
<ul>
        <li>apex.item('ITEMNAME').getValue() : Gets the current status of the ScrollingBar which is number between 0 and 1.</li>
        <li>apex.item('ITEMNAME').setValue(someValue) : Sets the current status of the ScrollingBar which can be number between 0 and 1.</li>
        <li>apex.item('ITEMNAME').show() : Shows the Scrolling Bar.</li>
        <li>apex.item('ITEMNAME').hide() : Hides the Scrolling Bar.</li>
</ul>
<br>
<b>Initialization JavaScript Function</b>
<p>The Plug-in settings can be overwritten by using the Init JS Function</p>
<br>

![image](https://github.com/baldogiRichard/apex-scroll-progress-bar/assets/100072414/8249abb5-e28a-490a-a37d-865180b7bb24)

<p>Please check out the <b>js/nprogress.js</b> file for all available options.</p>

![image](https://github.com/baldogiRichard/apex-scroll-progress-bar/assets/100072414/e42777fa-3fb4-45b9-a128-6f38cfd3f6d0)


#

License MIT
