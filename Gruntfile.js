/* jshint node:true */
module.exports = function( grunt ) {
	'use strict';

	grunt.initConfig({

		// Autoprefixer.
		postcss: {
			options: {
				processors: [
					require( 'autoprefixer' )({
						browsers: [
							'> 0.1%',
							'ie 8',
							'ie 9'
						]
					})
				]
			},
			dist: {
				src: [
					'style.css',
					'assets/sass/admin/*.css',
					'assets/sass/admin/welcome-screen/welcome.css',
					'assets/sass/admin/customizer/customizer.css',
					'assets/sass/jetpack/jetpack.css',
					'assets/sass/base/*.css'
				]
			}
		},

		// JavaScript linting with JSHint.
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			
			all: [
				'Gruntfile.js',
				'assets/js/*.js',
				'!assets/js/*.min.js',
				'assets/js/admin/*.js',
				'!assets/js/admin/*.min.js'
			]
		},

		// Sass linting with Stylelint.
		stylelint: {
			options: {
				configFile: '.stylelintrc'
			},
			all: [
				'assets/css/**/*.scss',
				'!assets/css/sass/vendors/**/*.scss'
			]
		},

		// Minify .js files.
		uglify: {
			options: {
				preserveComments: 'some'
			},

			main: {
				files: [{
					expand: true,
					cwd: 'assets/js/',
					src: [
						'*.js',
						'!*.min.js'
					],
					dest: 'assets/js/',
					ext: '.min.js'
				}]
			},

			vendor: {
				files: [{
					expand: true,
					cwd: 'assets/js/vendor/',
					src: [
						'*.js',
						'!*.min.js'
					],
					dest: 'assets/js/vendor/',
					ext: '.min.js'
				}]
			},

			admin: {
				files: [{
					expand: true,
					cwd: 'assets/js/admin/',
					src: [
						'*.js',
						'!*.min.js'
					],
					dest: 'assets/js/admin/',
					ext: '.min.js'
				}]
			}
		},

		// Compile all .scss files.
		sass: {
			dist: {
				options: {
					require: 'susy',
					sourcemap: 'none',
					includePaths: require( 'node-bourbon' ).includePaths
				},
				files: [{
					'style.dist.css': 'style.scss',
					'assets/css/admin/admin.css': 'assets/css/admin/admin.scss',
					'assets/css/base/icons.css': 'assets/css/base/icons.scss'
				}]
			}
		},

		// Minify all .css files.
		cssmin: {
			main: {
				files: {
					'style.css': ['style.dist.css']
				}
			},

			admin: {
				expand: true,
				cwd: 'assets/css/admin/',
				src: ['*.css'],
				dest: 'assets/css/admin/',
				ext: '.css'
			}
			
		},

		// Watch changes for assets.
		watch: {
			css: {
				files: [
					'style.scss',
					'assets/css/base/*.scss',
					'assets/css/admin/*.scss',
					'assets/css/sass/components/*.scss',
					'assets/css/sass/utils/*.scss',
					'assets/css/sass/vendors/*.scss'
				],
				tasks: [
					'sass',
					'css'
				]
			},

			js: {
				files: [
					// main js
					'assets/js/*js',
					'!assets/js/*.min.js',

					// customizer js
					'assets/js/customizer/*js',
					'!assets/js/customizer/*.min.js',

					// Welcome screen js
					'assets/js/admin/welcome-screen/*js',
					'!assets/js/admin/welcome-screen/*.min.js'
				],
				tasks: ['jshint', 'uglify']
			}
		},

		// Generate POT files.
		makepot: {
			options: {
				type: 'wp-theme',
				domainPath: 'languages',
				potHeaders: {
					'report-msgid-bugs-to': 'https://gitlab.com/conixconverter/crypto.gitissues',
					'language-team': 'LANGUAGE <EMAIL@ADDRESS>'
				}
			},

			frontend: {
				options: {
					potFilename: 'crypto.pot',
					exclude: [
						'crypto/.*' // Exclude deploy directory
					]
				}
			}
		},

		// Check textdomain errors.
		checktextdomain: {
			options:{
				text_domain: 'crypto',
				keywords: [
					'__:1,2d',
					'_e:1,2d',
					'_x:1,2c,3d',
					'esc_html__:1,2d',
					'esc_html_e:1,2d',
					'esc_html_x:1,2c,3d',
					'esc_attr__:1,2d',
					'esc_attr_e:1,2d',
					'esc_attr_x:1,2c,3d',
					'_ex:1,2c,3d',
					'_n:1,2,4d',
					'_nx:1,2,4c,5d',
					'_n_noop:1,2,3d',
					'_nx_noop:1,2,3c,4d'
				]
			},

			files: {
				src:  [
					'**/*.php', // Include all files
					'!node_modules/**' // Exclude node_modules/
				],
				expand: true
			}
		},

		// Creates deploy-able theme
		copy: {
			deploy: {
				src: [
					'**',
					'!.*',
					'!*.md',
					'!.*/**',
					'.htaccess',
					'!Gruntfile.js',
					'!package.json',
					'!node_modules/**',
					'!.DS_Store',
					'!npm-debug.log',
					'!.stylelintrc',
					'!.gitignore',
					'!.jshintrc'
				],
				dest: 'crypto',
				expand: true,
				dot: true
			}
		},

		compress: {
			zip: {
				options: {
					archive: './crypto.zip',
					mode: 'zip'
				},
				files: [
					{ src: './crypto/**' }
				]
			}
		}
	});

	// Load NPM tasks to be used here
	grunt.loadNpmTasks( 'grunt-contrib-jshint' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-sass' );
	grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-wp-i18n' );
	grunt.loadNpmTasks( 'grunt-checktextdomain' );
	grunt.loadNpmTasks( 'grunt-contrib-copy' );
	grunt.loadNpmTasks( 'grunt-rtlcss' );
	grunt.loadNpmTasks( 'grunt-postcss' );
	grunt.loadNpmTasks( 'grunt-contrib-compress' );
	grunt.loadNpmTasks( 'grunt-stylelint' );


	// Register tasks
	grunt.registerTask( 'default', [
		'css',
		'jshint',
		'uglify'
	]);

	grunt.registerTask( 'css', [
		'sass',
		'postcss',
		'cssmin'
	]);

	grunt.registerTask( 'dev', [
		'default',
		'makepot'
	]);

	grunt.registerTask( 'deploy', [
		'copy',
		'compress'
	]);
};