import * as THREE from './build/three.module.js';

const app = {
    init() {
        this.scene = new THREE.Scene()

        this.scene.background = new THREE.Color('black');;

        this.camera = new THREE.PerspectiveCamera()
        this.camera.position.z = 50;

        this.renderer = new THREE.WebGLRenderer()
        this.renderer.setSize( window.innerWidth, window.innerHeight )

        document.body.appendChild( this.renderer.domElement )

        this.createLights()
        this.knot = this.createKnot()
        this.knot1 = this.createKnot1()
        this.knot2 = this.createKnot2()


        // ...the rare and elusive hard binding appears! but why?
        this.render = this.render.bind( this )
        this.render()



    },

    createLights() {
        const pointLight1 = new THREE.PointLight( 0xffffff )
        pointLight1.position.x = 10

        const pointLight2 = new THREE.PointLight( 0xffffff )
        pointLight2.position.z = 50
        pointLight2.position.x = 50
        pointLight2.position.y = 50

        const pointLight3 = new THREE.PointLight( 0xffffff )
        pointLight3.position.z = 250

        const pointLight4 = new THREE.PointLight( 0xffffff )
        pointLight3.position.y = 12


        this.scene.add( pointLight1 )
        this.scene.add( pointLight2)
        this.scene.add( pointLight3 )
        this.scene.add( pointLight4 )
    },

    createKnot() {

        const knotgeo = new THREE.TorusKnotBufferGeometry( 10, 3, 10, 16 );
        const mat     = new THREE.MeshPhongMaterial({ color:'orangered', shininess:2000 })
        const knot    = new THREE.Mesh( knotgeo, mat )

        this.scene.add( knot )
        return knot
    },

    createKnot1() {

        var geometry = new THREE.SphereBufferGeometry( 20, 200, 200 );

        var wireframe = new THREE.WireframeGeometry( geometry );

        var line = new THREE.LineSegments( wireframe );
        line.material.depthTest = false;
        line.material.opacity = 0.25;
        line.material.transparent = true;

        const knotgeo = new THREE.TorusKnotBufferGeometry( 30, 3, 10, 16 );
        const mat     = new THREE.MeshPhongMaterial({ color:'dodgerblue', shininess:2000 })
        const knot    = new THREE.Mesh( knotgeo, mat )

        this.scene.add( line )
        this.scene.add( knot )
        return knot
    },

    createKnot2() {

        const knotgeo = new THREE.IcosahedronBufferGeometry(4)
        const mat     = new THREE.MeshPhongMaterial({ color:'green', shininess:2000 })
        const knot    = new THREE.Mesh( knotgeo, mat )

        this.scene.add( knot )
        return knot
    },

    render() {
        this.knot.rotation.x += .07
        this.knot.rotation.y += .09
        this.knot.rotation.z += .035
        this.knot1.rotation.x -= .035
        this.knot1.rotation.y -= .05
        this.knot1.rotation.z -= .02
        this.knot2.rotation.y += .035

        this.renderer.render( this.scene, this.camera )
        window.requestAnimationFrame( this.render )
    }
}

window.onload = ()=> app.init()