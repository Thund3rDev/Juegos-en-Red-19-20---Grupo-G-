// Variables del menu.
var nextPageButton;
var cam;

// Funcion que detecta si el raton se encuentra sobre el boton 'nextPage' y activa su luz en caso afirmativo.
function CheckOption6(scene) {
  if (scene.input.mousePointer.y > nextPageButton.y - 35 && scene.input.mousePointer.y < nextPageButton.y + 35) {
    if (!nextPageButton.isActive)
        hoverSound.play({ volume: game.soundVolume });
    nextPageButton.isActive = true;
  }
  else
    nextPageButton.isActive = false;
}
// Clase correspondiente a la escena del tutorial del menu.
class SceneMenuTutorial extends Phaser.Scene{
  // Constructor de la escena.
  constructor(){
    super("menuTutorial");
  }

  // Funcion create, que crea los elementos del propio juego.
  create ()
  {

    // Variable que indica si se está cambiando de escena.
    isChangingScene = false;

    // Añadimos el nextPageground.
    const backgroundimg = this.matter.add.sprite(960/2, 540/2, "Portrait", 0);
    backgroundimg.anims.play('portrait_anim', true);
    backgroundimg.setStatic(true);

    // Añadimos la imagen del tutorial.
    this.add.image(960/2, 540/2, 'menuTutorial');

    // Añadimos el boton de 'nextPage'. Hacemos tambien un fade con la camara.
    cam = this.cameras.main;
    //cam.fadeIn(1000);
  	nextPageButton = new Button(this, 960/2, 500, 'light', function() {
			selectedSound.play({ volume: game.soundVolume });
      isChangingScene = true;
      //cam.fadeOut(1000);
      game.customTransition(this.scene, 'menuTutorial2', 0);
    });

  	// Hacemos la luz invisible.
    nextPageButton.alpha = 0;

  	// Añadimos el texto de 'nextPage'.
    this.add.image(960/2, 500, 'text_nextPage');

  	// Añadimos la funcion que se ejecutara al presionar el boton izquierdo del raton.
  	// Si se esta sobre el boton 'nextPage', se volverá al menu principal.
  	this.input.on('pointerdown', function () {
        if (!isChangingScene && nextPageButton.isActive) {
            nextPageButton.Behaviour();
        }
    });

  }

  // Funcion update, que se ejecuta en cada frame.
  update (time, delta)
  {

    // Solo si no se esta cambiando de escena, se comprobara si se esta sobre el boton 'nextPage' en cada momento.
    if (!isChangingScene)
        CheckOption6(this);

    // Se ejecuta el update del boton 'nextPage'.
    nextPageButton.Update(time, delta);

  }
}
