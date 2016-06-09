<?php 
/* 
Plugin Name: Family Tree
Description: Display and edit a Family Tree 
Version: 1.0 
Author: nytweb 
*/

function add_scripts()
{
    if (isset($_GET['view-family-tree']) && $_GET['view-family-tree']) {
        // HEADER STYLES
        wp_enqueue_style( 'family-tree', plugins_url('dist/css/main.css', __FILE__));
        wp_enqueue_style( 'jquery-ui', 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.2/themes/redmond/jquery-ui.css' );

        // FOOTER SCRIPTS
        wp_register_script('jquery-ui', 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.2/jquery-ui.js', array('jquery'), null, true);
        wp_enqueue_script('jquery-ui');

        wp_register_script('bootstrap', 'https://netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.min.js', array(), null, true);
        wp_enqueue_script('bootstrap');

        wp_register_script('d3', 'https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.17/d3.js', array(), null, true);
        wp_enqueue_script('d3');

        wp_register_script('traceur-runtime', plugins_url( 'bower_components/traceur-runtime/traceur-runtime.js', __FILE__), array(), null, true);
        wp_enqueue_script('traceur-runtime');

        wp_register_script('lodash', 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.12.0/lodash.js', array(), null, true);
        wp_enqueue_script('lodash');

        wp_register_script('upload', plugins_url('bower_components/blueimp-file-upload/js/jquery.fileupload.js', __FILE__ ), array('jquery'), null, true);
        wp_enqueue_script('upload');

        wp_register_script('node-modal', plugins_url( 'dist/scripts/NodeModal.js', __FILE__ ), array('jquery', 'bootstrap'), null, true);
        wp_enqueue_script('node-modal');

        wp_register_script('global-js', plugins_url( 'dist/scripts/global.js', __FILE__), array('jquery', 'node-modal'), null, true);
        wp_enqueue_script('global-js');

        wp_register_script('draw-tree', plugins_url( 'dist/scripts/drawTree.js', __FILE__ ), array('jquery', 'd3', 'global-js'), null, true);
        wp_enqueue_script('draw-tree');
    }
}
add_action( 'wp_enqueue_scripts', 'add_scripts', 9998 );

function show_family_tree() {
    if (isset($_GET['view-family-tree']) && $_GET['view-family-tree']) {
        include('tree.php');
    }
}

/* display the family tree before activity post form when family parameter is passed in request */
add_action( 'get_template_part_content', 'show_family_tree', 10 );

?>