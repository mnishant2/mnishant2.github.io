// // function setup() {
// //     var myCanvas = createCanvas(windowWidth, windowHeight);
// //     myCanvas.class('backgroundsketch');
// // }


// // All the paths
// let paths = [];
// // Are we painting?
// let painting = false;
// // How long until the next circle
// let next = 0;
// // Where are we now and where were we?
// let current;
// let previous;

// function setup() {
//   var myCanvas = createCanvas(windowWidth, windowHeight);
//   myCanvas.class('backgroundsketch');
//   current = createVector(0,0);
//   previous = createVector(0,0);
// };

// function draw() {
//   background(200);
  
//   // If it's time for a new point
//   if (millis() > next && painting) {

//     // Grab mouse position      
//     current.x = mouseX;
//     current.y = mouseY;

//     // New particle's force is based on mouse movement
//     let force = p5.Vector.sub(current, previous);
//     force.mult(0.05);

//     // Add new particle
//     paths[paths.length - 1].add(current, force);
    
//     // Schedule next circle
//     next = millis() + random(100);

//     // Store mouse values
//     previous.x = current.x;
//     previous.y = current.y;
//   }

//   // Draw all paths
//   for( let i = 0; i < paths.length; i++) {
//     paths[i].update();
//     paths[i].display();
//   }
// }

// // Start it up
// function mousePressed() {
//   next = 0;
//   painting = true;
//   previous.x = mouseX;
//   previous.y = mouseY;
//   paths.push(new Path());
// }

// // Stop
// function mouseReleased() {
//   painting = false;
// }

// // A Path is a list of particles
// class Path {
//   constructor() {
//     this.particles = [];
//     this.hue = random(100);
//   }

//   add(position, force) {
//     // Add a new particle with a position, force, and hue
//     this.particles.push(new Particle(position, force, this.hue));
//   }
  
//   // Display plath
//   update() {  
//     for (let i = 0; i < this.particles.length; i++) {
//       this.particles[i].update();
//     }
//   }  
  
//   // Display plath
//   display() {    
//     // Loop through backwards
//     for (let i = this.particles.length - 1; i >= 0; i--) {
//       // If we shold remove it
//       if (this.particles[i].lifespan <= 0) {
//         this.particles.splice(i, 1);
//       // Otherwise, display it
//       } else {
//         this.particles[i].display(this.particles[i+1]);
//       }
//     }
  
//   }  
// }

// // Particles along the path
// class Particle {
//   constructor(position, force, hue) {
//     this.position = createVector(position.x, position.y);
//     this.velocity = createVector(force.x, force.y);
//     this.drag = 0.95;
//     this.lifespan = 255;
//   }

//   update() {
//     // Move it
//     this.position.add(this.velocity);
//     // Slow it down
//     this.velocity.mult(this.drag);
//     // Fade it out
//     this.lifespan--;
//   }

//   // Draw particle and connect it with a line
//   // Draw a line to another
//   display(other) {
//     stroke(0, this.lifespan);
//     fill(0, this.lifespan/2);    
//     ellipse(this.position.x,this.position.y, 8, 8);    
//     // If we need to draw a line
//     if (other) {
//       line(this.position.x, this.position.y, other.position.x, other.position.y);
//     }
//   }
// }
const particles = [];
function setup() {
	var myCanvas = createCanvas(windowWidth, windowHeight);
    myCanvas.class('backgroundsketch');
	
	const particlesLength = Math.min(Math.floor(window.innerWidth / 10), 100);
	for(let i=0; i<particlesLength; i++) {
		particles.push(new Particle());
	}
}

function draw() {
	background(55,100,144);
	
	particles.forEach((particle, idx) => {
		particle.update();
		particle.draw();
		particle.checkParticles(particles.slice(idx));
	});
}

class Particle {
	constructor() {
		this.pos = createVector(random(width), random(height));
		this.vel = createVector(random(-2, 2), random(-2, 2));
		this.size = 5;
	}
	
	update() {
		this.pos.add(this.vel);
		this.edges();
	}
	
	draw() {
		noStroke();
		fill('rgba(255, 255, 255, 0.5)');
		circle(this.pos.x, this.pos.y, this.size * 2);
	}
	
	edges() {
		if(this.pos.x < 0 || this.pos.x > width) {
			this.vel.x *= -0.5;
		}
		
		if(this.pos.y < 0 || this.pos.y > height) {
			this.vel.y *= -0.5;
		}
		
// 		if(this.pos.x > width) {
// 			this.pos.x = 0;
// 		}
		
// 		if(this.pos.y > height) {
// 			this.pos.y = 0;
// 		}
	}
	
	checkParticles(particles) {
		particles.forEach(particle => {
			const d = dist(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
			if(d < 120) {
				const alpha = map(d, 0, 120, 0, 0.25)
				stroke(`rgba(255, 255, 255, ${alpha})`);
				line(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y)
			}
		});
	}
}

// SOCIAL PANEL JS
const floating_btn = document.querySelector('.floating-btn');
const close_btn = document.querySelector('.close-btn');
const social_panel_container = document.querySelector('.social-panel-container');

floating_btn.addEventListener('click', () => {
	social_panel_container.classList.toggle('visible')
});

close_btn.addEventListener('click', () => {
	social_panel_container.classList.remove('visible')
});