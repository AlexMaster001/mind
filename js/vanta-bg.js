document.addEventListener('DOMContentLoaded', function() {
    feather.replace();
    
    if (document.getElementById('vanta-bg')) {
        VANTA.NET({
            el: "#vanta-bg",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x5a67d8,
            backgroundColor: 0xf7fafc,
            points: 10.00,
            maxDistance: 23.00,
            spacing: 19.00
        });
    }
});