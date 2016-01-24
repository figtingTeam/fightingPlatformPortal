module.exports = function(grunt) {

    // 1. grunt所有的配置
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // 2. 配置需要合并的文件
        concat: { // 文件合并
            dist: { 
                src: [
                    'javascript/html5shiv.js',
                    'javascript/main.js'
                ],
                dest: 'pure-sass-project/javascript/'
            }
        },
        uglify: { //文件压缩
            build: {
                src: 'javascript/build/production.js',
                dest: 'javascript/build/production.min.js'
            }
        },
        imagemin: {  //图片压缩
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'images/',
                    src: ['*.{png,jpg,gif}'],
                    dest: 'pure-sass-project/images/'
                }]
            }
        },
        watch: { // 文件监听
            options: {
                livereload: true,
            },
            scripts: {
                files: ['pure-sass-project/javascript/*.js'],
                //tasks: ['concat', 'uglify'],
                options: {
                    spawn: false,
                }
            },
            html: {
                files: ['pure-sass-project/*.html'],
            },
            css: {
                files: ['pure-sass-project/sass/*.scss'],
                tasks: ['sass'],
                options: {
                    spawn: false,
                }
            }
        },
        sass: {  // sass预处理器
            dist: {  
                  options: {
                    style: 'expanded'
                  },
                  files: { 
                    'pure-sass-project/stylesheet/app.css': 'main.scss', // '目标文件': '源文件'
                  }
            }
        }
    });
    // 3. 告诉Grunt 我们要使用到的插件.
    grunt.loadNpmTasks('grunt-contrib-concat'); // js合并
    grunt.loadNpmTasks('grunt-contrib-uglify'); // js压缩
    //grunt.loadNpmTasks('grunt-contrib-imagemin'); // 图片压缩
    grunt.loadNpmTasks('grunt-contrib-watch'); // 监听文件变化
    grunt.loadNpmTasks('grunt-contrib-sass'); //sass预处理器,只需要在watch模块中配置即可

    // 4. 告诉grunt我们需要他执行哪些任务
    grunt.registerTask('default', ['uglify', 'watch']);

};