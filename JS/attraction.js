document.addEventListener('DOMContentLoaded', () => {
    const orbit = document.querySelector('.orbit');
    const circles = document.querySelectorAll('.circle');
    const contents = document.querySelectorAll('.content');
    let activeCircle = null;

    // Position circles around center
    const radius = 150;
    circles.forEach((circle, index) => {
        const angle = (index / 5) * 2 * Math.PI;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        circle.style.left = `calc(50% + ${x}px - 30px)`; // 30px is half circle width
        circle.style.top = `calc(50% + ${y}px - 30px)`;

        let staticRotation;
        switch (index) {
            case 0: // Circle 1
                staticRotation = -90; // Adjust this value (e.g., 0, 30, 45, etc.)
                break;
            case 1: // Circle 2
                staticRotation = -20; // Adjust this value
                break;
            case 2: // Circle 3
                staticRotation = 55; // Adjust this value
                break;
            case 3: // Circle 4
                staticRotation = 128; // Adjust this value
                break;
            case 4: // Circle 5
                staticRotation = 200; // Adjust this value
                break;
        }
        circle.style.transform = `rotate(${staticRotation}deg)`;
        
        circle.addEventListener('click', () => handleCircleClick(circle, index));
    });

    function handleCircleClick(clickedCircle, index) {
        if (activeCircle === clickedCircle) {
            // Close content and resume floating
            contents[index].classList.remove('active');
            orbit.style.animation = 'float 20s infinite linear';
            activeCircle = null;
            return;
        }

        // Close any open content
        contents.forEach(content => content.classList.remove('active'));

        // Calculate rotation needed to bring clicked circle to bottom
        const currentAngle = (index / 5) * 360;
        const targetAngle = 270; // Bottom position
        let rotation = targetAngle - currentAngle;
        
        // Normalize rotation to shortest path
        if (rotation > 180) rotation -= 360;
        if (rotation < -180) rotation += 360;

        // Stop floating and spin
        orbit.style.animation = 'none';
        orbit.style.transform = `rotate(${rotation}deg)`;

        setTimeout(() => {
            contents[index].classList.add('active');
            activeCircle = clickedCircle;
            gotoContent(activeCircle);
        }, 500);
    }
});

function gotoContent(circleRef){
    // Check if the clicked element has the scroll-button class
    const targetElement = document.getElementById(circleRef.dataset.value);

    if (targetElement) {
        targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    } else {
        console.log("Target element not found!");
    }
    
};