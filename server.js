const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;

// HTML files serve karne ke liye
function servePage(res, fileName, statusCode) {
    const filePath = path.join(__dirname, fileName);

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500, {
                "Content-Type": "text/html"
            });

            res.end("<h1>500 - Internal Server Error</h1>");
            return;
        }

        res.writeHead(statusCode, {
            "Content-Type": "text/html"
        });

        res.end(data);
    });
}

// CSS file serve karne ke liye
function serveCSS(res) {
    const filePath = path.join(__dirname, "public", "style.css");

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500, {
                "Content-Type": "text/plain"
            });

            res.end("Unable to load CSS");
            return;
        }

        res.writeHead(200, {
            "Content-Type": "text/css"
        });

        res.end(data);
    });
}

// Server
const server = http.createServer((req, res) => {

    console.log(`Request received: ${req.method} ${req.url}`);

    // CSS
    if (req.url === "/style.css" && req.method === "GET") {
        serveCSS(res);
    }

    // Home
    else if (req.url === "/home" && req.method === "GET") {
        servePage(res, "home.html", 200);
    }

    // About
    else if (req.url === "/about" && req.method === "GET") {
        servePage(res, "about.html", 200);
    }

    // Services
    else if (req.url === "/services" && req.method === "GET") {
        servePage(res, "services.html", 200);
    }

    // Products
    else if (req.url === "/products" && req.method === "GET") {
        servePage(res, "products.html", 200);
    }

    // Help
    else if (req.url === "/help" && req.method === "GET") {
        servePage(res, "help.html", 200);
    }

    // Contact
    else if (req.url === "/contact" && req.method === "GET") {
        servePage(res, "contact.html", 200);
    }

    // Unknown URL
    else {
        servePage(res, "404.html", 404);
    }
});

// Start server
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});