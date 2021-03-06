/*
 JCat Online Player + JCat Stream Info v.2.0.0_beta1
 Copyright (c) 2016-2019 Andrew Molchanov
 https://github.com/JoCat/JCPlayer
 https://github.com/JoCat/JSInfo
*/

// Player Object
JCPlayer = {
    // Params
    server_address: 'http://127.0.0.1:8000/', // Default address:port
    mounts_list: ['live', 'nonstop'], // Mount point list
    stream_mount: 'live', // Default mount
    info_link: 'info.xsl', // Info file
    time_update: 10, // Time to update information (in seconds)

    // System Params
    audio_object: {},
    player_stoped: true,

    // Functions
    init: function (init_params) {
        // Setting transmitted parameters
        if (typeof init_params == 'object') {
            init_params_list = Object.keys(init_params);
            for (let parameter of init_params_list) {
                JCPlayer[parameter] = init_params[parameter];
            }
        }

        $("#jcp-player").html('<i id="jcp-play"></i><i id="jcp-stop"></i><input id="jcp-volume" type="range" min="0" max="100" value="50" step="1" />');

        // Init audio object
        JCPlayer.audio_object = new Audio();
        JCPlayer.audio_object.volume = 0.5;

        // Events
        $("#jcp-player").on('click', '#jcp-play', JCPlayer.play);
        $("#jcp-player").on('click', '#jcp-pause', JCPlayer.pause);
        $("#jcp-player").on('click', '#jcp-stop', JCPlayer.stop);
        $("#jcp-player").on('mousemove', '#jcp-volume', JCPlayer.change_volume);

        timer = setTimeout(function showinfo() {
            $.ajax({
                dataType: 'json',
                url: JCPlayer.server_address + JCPlayer.info_link,
                success: function(d) {
                    for (let mount_name of JCPlayer.mounts_list) {
                        if (d[mount_name]) {
                          for (let param of Object.keys(d[mount_name])) {
                            $("#jcp-"+param).html(d[mount_name][param]);
                          }
                          break;
                        }
                    }
                }
            });
            timer = setTimeout(showinfo,JCPlayer.time_update*1000);
        },JCPlayer.time_update*1000);
    },

    play: function() {
        if (JCPlayer.player_stoped === true) {
            JCPlayer.audio_object.setAttribute("src", JCPlayer.server_address + JCPlayer.stream_mount);
            JCPlayer.player_stoped = false;
        }
        JCPlayer.audio_object.play();
        $(this).attr('id', 'jcp-pause');
    },
    pause: function() {
        JCPlayer.audio_object.pause();
        $(this).attr('id', 'jcp-play');
    },
    stop: function() {
        JCPlayer.audio_object.pause();
        JCPlayer.audio_object.setAttribute("src", "");
        JCPlayer.player_stoped = true;
        $('#jcp-pause').attr('id', 'jcp-play');
    },
    change_volume: function() {
        JCPlayer.audio_object.volume = parseFloat(this.value / 100);
    }
};