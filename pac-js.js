document.addEventListener("DOMContentLoaded", function() {
  const pacman = document.getElementById("pacman");
  const gameContainer = document.getElementById("game-container");
  const walls = document.querySelectorAll(".wall");
  const foods = document.querySelectorAll(".food");
  const obstacles = document.querySelectorAll(".obstacle");

  let pacmanPosition = { x: 0, y: 0 };

  document.addEventListener("keydown", function(event) {
    if (event.key === "w" || event.key === "ArrowUp") {
      movePacman("up");
    } else if (event.key === "s" || event.key === "ArrowDown") {
      movePacman("down");
    } else if (event.key === "a" || event.key === "ArrowLeft") {
      movePacman("left");
    } else if (event.key === "d" || event.key === "ArrowRight") {
      movePacman("right");
    }
  });

  function movePacman(direction) {
    const newPosition = { ...pacmanPosition };
    let isOpen = false;

    if (direction === "up") {
      newPosition.y -= 1;
      isOpen = true;
    } else if (direction === "down") {
      newPosition.y += 1;
      isOpen = true;
    } else if (direction === "left") {
      newPosition.x -= 1;
      isOpen = true;
    } else if (direction === "right") {
      newPosition.x += 1;
      isOpen = true;
    }

    if (isOpen) {
      pacman.classList.toggle("open");
    }

    if (isWallCollision(newPosition) || isObstacleCollision(newPosition) || isBoundaryCollision(newPosition)) {
      return;
    }

    pacmanPosition = newPosition;
    pacman.style.left = `${pacmanPosition.x * 30}px`;
    pacman.style.top = `${pacmanPosition.y * 30}px`;

    eatFood();
  }

  function isWallCollision(position) {
    return Array.from(walls).some(wall => {
      const wallPosition = {
        x: parseInt(wall.style.left) / 30,
        y: parseInt(wall.style.top) / 30,
      };
      return wallPosition.x === position.x && wallPosition.y === position.y;
    });
  }

  function isObstacleCollision(position) {
    return Array.from(obstacles).some(obstacle => {
      const obstaclePosition = {
        x: parseInt(obstacle.style.left) / 30,
        y: parseInt(obstacle.style.top) / 30,
      };
      return obstaclePosition.x === position.x && obstaclePosition.y === position.y;
    });
  }

  function isBoundaryCollision(position) {
    return (
      position.x < 0 ||
      position.x >= gameContainer.offsetWidth / 30 ||
      position.y < 0 ||
      position.y >= gameContainer.offsetHeight / 30
    );
  }

  function eatFood() {
    Array.from(foods).forEach(food => {
      const foodPosition = {
        x: parseInt(food.style.left) / 30,
        y: parseInt(food.style.top) / 30,
      };

      if (
        foodPosition.x === pacmanPosition.x &&
        foodPosition.y === pacmanPosition.y
      ) {
        food.parentNode.removeChild(food);
      }
    });
  }
});
