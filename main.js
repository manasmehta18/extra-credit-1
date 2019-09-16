import * as THREE from './build/three.module.js';

const app = {
    init() {
        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera();
        this.camera.position.z = 50;

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( window.innerWidth, window.innerHeight );

        document.body.appendChild( this.renderer.domElement );

        this.createLights();
        this.knot = this.createKnot();

        // ...the rare and elusive hard binding appears! but why?
        this.render = this.render.bind( this );
        this.render()
    },

    createLights() {
        const pointLight = new THREE.PointLight( 0xffffff );
        pointLight.position.z = 100;

        this.scene.add( pointLight )
    },

    createKnot() {
        const knotgeo = new THREE.TorusKnotGeometry( 10, .1, 128, 16, 5, 21 );
        const mat     = new THREE.MeshPhongMaterial({ color:0xff0000, shininess:2000 });
        const knot    = new THREE.Mesh( knotgeo, mat );

        this.scene.add( knot );
        return knot
    },

    render() {
        this.knot.rotation.x += .025;
        this.renderer.render( this.scene, this.camera );
        window.requestAnimationFrame( this.render )
    }
}

window.onload = ()=> app.init();