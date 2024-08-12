<template>
  <div class="video-wrapper">
    <video :src="src" class="custom-video"></video>
    <div class="video-controls">
      <div class="controls-items">
        <div class="controls-item">
          <MinimizeIcon
            id="fullscreen"
            class="fullscreen w-4"
            aria-label="Fullscreen"
          />

          <div id="sound">
            <SoundIcon class="soundIcon" />
            <MuteIcon class="muteIcon" />
            <div class="volume-slider" style="display: none">
              <div class="volume-bar">
                <div class="volume-level" style="width: 38.75%"></div>
              </div>
            </div>
          </div>
          <div id="play-speed" class="play-speed">
            <span>1X</span>
            <ul style="display: none">
              <li class="selected" data-value="1">1X</li>
              <li data-value="1.5">1.5X</li>
              <li data-value="2">2X</li>
            </ul>
          </div>
        </div>

        <div class="relative">
          <SettingIcon
            class="text-neutral-white"
            @click="qualityPopup = !qualityPopup"
          />
          <Dialog v-model:visible="qualityPopup" modal dismissableMask>
            <template #container>
              <div class="p-4 flex flex-col gap-4 rounded-2xl font-demi-bold">
                <h3 class="text-sm-st-one text-center">Video setting</h3>
                <div class="w-full h-[1px] bg-secondary-100"></div>
                <div class="flex justify-between gap-8 items-center">
                  <div class="flex items-center">
                    <ArrowRight @click="toggle" class="text-[16px]" />
                    <Menu ref="speedMenu" id="speed_menu" :popup="true">
                      <template #start>
                        <div class="p-4 ronded-2xl flex flex-col gap-2">
                          <div class="flex justify-between items-center">
                            <h3 class="text-sm-st-one font-demi-bold">
                              Playback speed
                            </h3>
                            <ArrowLeft class="text-[16px]" @click="toggle" />
                          </div>
                          <div class="w-full h-[1px] bg-secondary-100"></div>
                          <ul class="w-full flex flex-col gap-2">
                            <li class="flex justify-between items-center p-4">
                              <div
                                class="rounded bg-secondary-100 p-1 flex items-center justify-center font-500 text-sm-cp"
                              >
                                pro
                              </div>
                              <span class="text-sm-cp">0.25</span>
                            </li>
                          </ul>
                        </div>
                      </template>
                    </Menu>
                    <span class="text-sm-cp font-demi-bold">Normal</span>
                  </div>
                  <div class="flex gap-1">
                    <span class="text-sm-st-two">playback speed</span>
                    <PlayIcon class="stroke-neutral-black" />
                  </div>
                </div>

                <div class="flex justify-between">
                  <div class="flex gap-1">
                    <ArrowRight />
                    <span class="text-sm-cp font-demi-bold">Auto(720p60)</span>
                  </div>
                  <div class="flex gap-1">
                    <span class="text-sm-st-two"> Quality</span>
                    <QualityIcon />
                  </div>
                </div>
              </div>
            </template>
          </Dialog>
        </div>
        <div class="controls-item">
          <div class="time">
            <span class="total-duration">1:31</span><span>/</span
            ><span class="current-time">0:11</span>
          </div>
          <div class="play-pause">
            <span class="play" style="display: block"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="15"
                viewBox="0 0 14 15"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M1.89663 1.10432C0.909766 1.63909 0.370645 2.82076 0.370645 4.42507V10.5663C0.370645 12.1706 0.909766 13.3437 1.89663 13.8871C2.8835 14.4305 4.23587 14.2752 5.70702 13.473L11.3449 10.4024C12.8161 9.60027 13.6294 8.57386 13.6294 7.49569C13.6294 6.41752 12.8161 5.39111 11.3449 4.58895L5.70702 1.51834C4.81154 1.03532 3.97087 0.785182 3.22159 0.785182C2.72816 0.785182 2.28955 0.888686 1.89663 1.10432Z"
                  fill="#FF9900"
                ></path></svg></span
            ><span class="pause" style="display: none"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M4.5082 15C3.4918 15 3 14.4267 3 13.24V3.76C3 2.57333 3.4918 2 4.5082 2H6.4918C7.5082 2 8 2.57333 8 3.76V13.24C8 14.4267 7.5082 15 6.4918 15H4.5082ZM10.5082 15C9.4918 15 9 14.4267 9 13.24V3.76C9 2.57333 9.4918 2 10.5082 2H12.4918C13.5082 2 14 2.57333 14 3.76V13.24C14 14.4267 13.5082 15 12.4918 15H10.5082Z"
                  fill="#FF9900"
                ></path></svg
            ></span>
          </div>
        </div>
      </div>
      <div class="progress-bar">
        <div class="totalbar">
          <div class="current-bar" style="width: 12.2406%"></div>
        </div>
      </div>
    </div>
    <div id="play-video" style="display: flex">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M11.34 41.42C8.22 39.62 6.5 35.96 6.5 31.14V16.88C6.5 12.04 8.22 8.39998 11.34 6.59998C14.46 4.79998 18.48 5.13998 22.68 7.55998L35.02 14.68C39.2 17.1 41.52 20.42 41.52 24.02C41.52 27.62 39.22 30.94 35.02 33.36L22.68 40.48C20.26 41.86 17.9 42.56 15.74 42.56C14.16 42.56 12.66 42.18 11.34 41.42ZM12.84 9.17998C10.68 10.42 9.5 13.16 9.5 16.88V31.12C9.5 34.84 10.68 37.56 12.84 38.82C15 40.08 17.96 39.72 21.18 37.86L33.52 30.74C36.74 28.88 38.52 26.5 38.52 24C38.52 21.5 36.74 19.12 33.52 17.26L21.18 10.14C19.22 9.01998 17.38 8.43998 15.74 8.43998C14.66 8.43998 13.7 8.67998 12.84 9.17998Z"
          fill="#FF9900"
        ></path>
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const props = defineProps({
  src: { type: String, required: true }
})
import { Button, Loading } from '@/components'
import {
  MinimizeIcon,
  SoundIcon,
  MuteIcon,
  SettingIcon,
  ArrowRight,
  ArrowLeft,
  PlayIcon,
  QualityIcon
} from '@/components/icons'
import { cn } from '@/utils'

const qualityPopup = ref(false)
const speedMenu = ref()
const toggle = (event) => {
  speedMenu.value.toggle(event)
}
onMounted(() => {
  console.log('heyyyyy')
  const wrapper = document.querySelector('.video-wrapper')

  const video = wrapper.querySelector('.custom-video')
  const playPauseButton = wrapper.querySelector('.play-pause')
  const fullscreenButton = wrapper.querySelector('.fullscreen')
  const volumeControl = wrapper.querySelector('#sound')
  const volumeSlider = volumeControl?.querySelector('.volume-slider')
  const volumeLevel = volumeSlider?.querySelector('.volume-level')
  const currentTimeDisplay = wrapper.querySelector('.current-time')
  const totalDurationDisplay = wrapper.querySelector('.total-duration')
  const playSpeed = wrapper.querySelector('.play-speed span')
  const progressBar = wrapper.querySelector('.progress-bar .totalbar')
  const currentBar = wrapper.querySelector('.progress-bar .current-bar')
  const playSpeedMenu = wrapper.querySelector('.play-speed ul')
  const playSpeedItems = wrapper.querySelectorAll('.play-speed li')
  const centerPlayButton = wrapper.querySelector('#play-video')
  const videoControls = wrapper.querySelector('.video-controls')

  // Helper function to format time in minutes:seconds
  function formatTime(time) {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  // Helper function to toggle video playback
  function togglePlayPause() {
    if (video.paused || video.ended) {
      video.play()
      playPauseButton.querySelector('.play').style.display = 'none'
      playPauseButton.querySelector('.pause').style.display = 'block'
      centerPlayButton.style.display = 'none'
      videoControls.classList.add('video-playing')
    } else {
      video.pause()
      playPauseButton.querySelector('.play').style.display = 'block'
      playPauseButton.querySelector('.pause').style.display = 'none'
      videoControls.classList.remove('video-playing')
      centerPlayButton.style.display = 'flex'
    }
  }

  // Update total duration when metadata is loaded
  video.addEventListener('loadedmetadata', () => {
    totalDurationDisplay.textContent = formatTime(video.duration)
  })

  // Play or pause the video using the play/pause button
  playPauseButton.addEventListener('click', togglePlayPause)

  // Play or pause the video using the center play button
  centerPlayButton.addEventListener('click', togglePlayPause)

  // Play or pause the video when it is clicked
  video.addEventListener('click', togglePlayPause)

  // Toggle video playback with Enter or Space keys and seek with Arrow keys
  document.addEventListener('keydown', (event) => {
    const isInput =
      event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA'
    if (!isInput) {
      switch (event.code) {
        case 'Space':
        case 'Enter':
          event.preventDefault()
          togglePlayPause()
          break
        case 'ArrowRight':
          video.currentTime = Math.min(video.currentTime + 5, video.duration) // Seek forward 5 seconds
          break
        case 'ArrowLeft':
          video.currentTime = Math.max(video.currentTime - 5, 0) // Seek backward 5 seconds
          break
      }
    }
  })

  // Show/hide the volume slider
  volumeControl.addEventListener('mouseenter', () => {
    volumeSlider.style.display = 'block'
  })

  volumeControl.addEventListener('mouseleave', () => {
    volumeSlider.style.display = 'none'
  })

  // Update volume using custom slider
  volumeSlider.addEventListener('click', (event) => {
    const clickX = event.offsetX
    const width = volumeSlider.offsetWidth
    const volume = clickX / width
    video.volume = volume
    if (volume === 0) {
      volumeControl.classList.add('muted')
    } else {
      volumeControl.classList.remove('muted')
    }
    volumeLevel.style.width = `${volume * 100}%`
  })

  // Fullscreen toggle
  fullscreenButton.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      wrapper.requestFullscreen().catch((err) => {
        console.error(`Failed to enter fullscreen mode: ${err.message}`)
      })
      fullscreenButton.classList.add('active')
    } else {
      document.exitFullscreen()
      fullscreenButton.classList.remove('active')
    }
  })

  // Update progress bar and current time display as the video plays
  video.addEventListener('timeupdate', () => {
    const percentage = (video.currentTime / video.duration) * 100
    currentBar.style.width = `${percentage}%`
    currentTimeDisplay.textContent = formatTime(video.currentTime)
  })

  // Seek video when progress bar is clicked
  progressBar.addEventListener('click', (event) => {
    const clickX = event.offsetX
    const width = progressBar.offsetWidth
    const duration = video.duration
    video.currentTime = (clickX / width) * duration
  })

  // Toggle play speed menu
  playSpeed.addEventListener('click', () => {
    playSpeedMenu.style.display =
      playSpeedMenu.style.display === 'flex' ? 'none' : 'flex'
  })

  // Change playback speed
  playSpeedItems.forEach((item) => {
    item.addEventListener('click', () => {
      const speed = parseFloat(item.dataset.value)
      video.playbackRate = speed
      playSpeed.textContent = `${speed}X`
      playSpeedItems.forEach((i) => i.classList.remove('selected'))
      item.classList.add('selected')
      playSpeedMenu.style.display = 'none'
    })
  })

  // Hide the play speed menu when clicking outside
  document.addEventListener('click', (event) => {
    if (!wrapper.contains(event.target) && playSpeedMenu.style.display === 'flex') {
      playSpeedMenu.style.display = 'none'
    }
  })

  // Show play icon and center play button when the video ends
  video.addEventListener('ended', () => {
    playPauseButton.querySelector('.play').style.display = 'block'
    playPauseButton.querySelector('.pause').style.display = 'none'
    centerPlayButton.style.display = 'block'
    videoControls.classList.remove('video-playing')
  })
})
</script>

<style scoped lang="scss">
.video-wrapper {
  position: relative;
  > video {
    width: 100%;
    object-fit: cover;
    border-radius: 8px;
  }
  > .video-controls {
    opacity: 0;
    display: flex;
    position: absolute;
    bottom: 0;
    width: 100%;
    flex-direction: column;
    gap: 8px;
    border-radius: 16px;
    background: rgba(0, 0, 0, 0.4);
    -webkit-backdrop-filter: blur(4px);
    backdrop-filter: blur(4px);
    max-width: 96%;
    left: 50%;
    transform: translateX(-50%);
    padding: 16px;
    transition: 0.3s all ease;
    > .controls-items {
      display: flex;
      align-items: center;
      justify-content: space-between;
      > .controls-item {
        display: flex;
        align-items: center;
        gap: 8px;
        > .fullscreen {
          > svg:last-child {
            display: none;
          }
        }
        > .active {
          > svg:first-child {
            display: none;
          }
          > svg:last-child {
            display: block;
          }
        }
        > #sound {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 4px 8px;
          cursor: pointer;
          position: relative;

          @keyframes fade-volume {
            from {
              opacity: 0;
              transform: translateX(+20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          > .volume-slider {
            min-width: 80px;
            display: none;
            animation-name: fade-volume;
            animation-duration: 0.3s;
            > .volume-bar {
              width: 100%;
              height: 8px;
              border-radius: 25px;
              background: #aeaeae;
              position: relative;
              > .volume-level {
                position: absolute;
                left: 0;
                width: 30%;
                height: 8px;
                border-radius: 25px;
                background: #f90;
              }
            }
          }

          > .muteIcon {
            display: none;
          }
          > .soundIcon {
            display: block;
          }
        }
        > .muted {
          > .muteIcon {
            display: block !important;
          }
          > .soundIcon {
            display: none !important;
          }
        }
        @keyframes fade-speed {
          from {
            opacity: 0;
            transform: translateY(+20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        > .play-speed {
          position: relative;
          > span {
            color: #e7e7ee;
            font-size: 10px;
            font-weight: 600;
            line-height: 18px;
            border-radius: 4px;
            background: rgba(255, 243, 224, 0.3);
            width: 38px;
            height: 19px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
          }
          > ul {
            display: none;
            position: absolute;
            top: -70px;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            border-radius: 4px;
            background-color: #fff;
            padding: 4px 8px;
            animation-name: fade-speed;
            animation-duration: 0.3s;
            > li {
              color: #000000;
              font-size: 10px;
              font-weight: 600;
              line-height: 18px;
              cursor: pointer;
            }
          }
        }
        > .time {
          display: flex;
          align-items: center;
          gap: 4px;
          > span {
            color: #e7e7ee;
            font-size: 14px;
            font-weight: 600;
            line-height: 22px;
          }
        }
        > .play-pause {
          cursor: pointer;
          > .pause {
            display: none;
          }
        }
      }
    }
    > .progress-bar {
      width: 100%;
      display: flex;
      align-items: center;
      cursor: pointer;
      > .totalbar {
        width: 100%;
        height: 8px;
        border-radius: 25px;
        background: #aeaeae;
        position: relative;
        > .current-bar {
          position: absolute;
          left: 0;
          width: 0%;
          height: 8px;
          border-radius: 25px;
          background: #f90;
          transition: 0.2s all ease;
        }
      }
    }
  }
  > .video-playing {
    opacity: 1;
    bottom: 16px;
  }
  > #play-video {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    cursor: pointer;
    fill: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(8px);
    border-radius: 100%;
    width: 73.9px;
    height: 73.9px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

// RESPONSIVE
@media only screen and (max-width: 600px) {
  .video-wrapper {
    > .video-controls {
      padding: 8px;
      > .controls-items {
        > .controls-item {
          gap: 4px;
          > #sound {
            gap: 4px;
            > .volume-slider {
              > .volume-bar {
                height: 6px;
                > .volume-level {
                  height: 6px;
                }
              }
            }
          }
        }
      }
      > .progress-bar {
        cursor: pointer;
        > .totalbar {
          height: 6px;
          > .current-bar {
            height: 6px;
          }
        }
      }
    }
    > .video-playing {
      bottom: 8px;
    }
    > #play-video {
      width: 60px;
      height: 60px;
      > svg {
        max-width: 40px;
        max-height: 40px;
      }
    }
  }
}
</style>
