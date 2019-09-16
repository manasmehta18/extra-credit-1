import * as THREE from './build/three.module.js';

const app = {
    init() {
        this.scene = new THREE.Scene()
        this.scene.background = new THREE.Color( 'black' );

        this.camera = new THREE.PerspectiveCamera()
        this.camera.position.z = 50
        //this.camera.position.y = 100;

        this.renderer = new THREE.WebGLRenderer()
        this.renderer.setSize( window.innerWidth, window.innerHeight )

        document.body.appendChild( this.renderer.domElement )

        this.createLights()
        this.knot = this.createKnot()

        // ...the rare and elusive hard binding appears! but why?
        this.render = this.render.bind( this )
        this.render()
    },

    createLights() {
        const pointLight1 = new THREE.PointLight( 0xffffff )
        pointLight1.position.z = 100

        const pointLight2 = new THREE.PointLight( 0xffffff )
        pointLight2.position.z = 50
        pointLight2.position.x = 50
        pointLight2.position.y = 50

        const pointLight3 = new THREE.PointLight( 0xffffff )
        pointLight3.position.z = 25

        this.scene.add( pointLight1 )
        this.scene.add( pointLight2)
        this.scene.add( pointLight3 )
    },

    createKnot() {
        const knotgeo = new THREE.TorusKnotBufferGeometry( 10, 3, 100, 16 );
        const mat     = new THREE.MeshNormalMaterial()
        const knot    = new THREE.Mesh( knotgeo, mat )

        this.scene.add( knot )
        return knot
    },

    render() {
        this.knot.rotation.x += .025
        this.knot.rotation.y += .050
        this.knot.rotation.z += .015
        this.renderer.render( this.scene, this.camera )
        window.requestAnimationFrame( this.render )
    }
}

window.onload = ()=> app.init()
