<template>
  <div ref="wrapper" class="video-wrapper" >
    <video
      @click="togglePlayPause"
      @loadedmetadata="totlaDuration"
      :src="props.stream?.streamProviders?.cache?.urls?.p360"
      class="custom-video "
      @timeupdate="updateProgressbar"
      @ended="showPlayIcon"
      :poster="props?.stream?.streamMeta.thumbnail"
      controlslist="nodownload"
    ></video>
    <div class="video-controls">
      <div class="controls-items">
        <div class="flex items-center controls-item">
          <MinimizeIcon
            @click="toggleFullScreen"
            id="fullscreen"
            class="w-4 fullscreen"
            aria-label="Fullscreen"
          />
          <div class="relative">
            <div class="relative flex items-center justify-center">
              <Button
                id="setting"
                class="w-0 opacity-0"
                label=""
                @click="settingToggle"
                variant="text"
              />
              <label for="setting" class="-mr-10">
                <SettingIcon class="w-4 h-4 text-neutral-white " ref="settingIcon"  />
              </label>
            </div>

            <Popover ref="settingMenu" id="overlay_tmenu" baseZIndex="5000" >
              <div class="flex flex-col gap-4 p-4 rounded-2xl font-demi-bold ">
                <h3 class="text-center text-sm-st-one">Video setting</h3>
                <div class="w-full h-[1px] bg-secondary-100"></div>
                <div class="flex items-center justify-between gap-8">
                  <div class="relative flex items-center">
                    <div class="relative flex items-center justify-center">
                      <Button
                        id="speed"
                        class="w-0 opacity-0"
                        label=""
                        @click="speedToggle"
                        variant="text"
                      />
                      <label for="speed" class="">
                        <ArrowRight class="w-4 h-4 -mr-4" />
                      </label>
                    </div>
                    <Popover ref="speedMenu" id="speed_menu">
                      <div
                        class="p-4 ronded-2xl flex flex-col gap-2 min-w-[200px] max-h-[200px] overflow-auto"
                      >
                        <div class="flex items-center justify-between">
                          <h3 class="text-sm-st-one font-demi-bold">
                            Playback speed
                          </h3>
                          <ArrowLeft class="text-[16px]" @click="settingToggle" />
                        </div>
                        <div class="w-full h-[1px] bg-secondary-100"></div>
                        <ul class="flex flex-col w-full gap-2">
                          <li
                            v-for="item in speeds"
                            :key="item.speed"
                            class="flex flex-row-reverse items-center justify-between p-4 rounded-lg hover:bg-secondary-100"
                            @click="() => setSpeed(item.speed)"
                            :class="
                              cn({ 'bg-secondary-100 ': item.speed === videoSpeed })
                            "
                          >
                            <div
                              class="flex items-center justify-center p-1 rounded bg-secondary-100 font-500 text-sm-cp"
                              v-if="item.isPro"
                            >
                              pro
                            </div>
                            <span class="text-sm-cp">{{ item.speed }}</span>
                          </li>
                        </ul>
                      </div>
                    </Popover>
                    <span class="text-sm-st-two font-demi-bold">Normal</span>
                  </div>
                  <div class="flex gap-1">
                    <span class="text-st-two">playback speed</span>
                    <PlayIcon class="stroke-neutral-black" />
                  </div>
                </div>

                <div class="flex items-center justify-between gap-8">
                  <div class="relative flex items-center">
                    <div class="relative flex items-center justify-center">
                      <Button
                        id="quality"
                        class="w-0 opacity-0"
                        label=""
                        @click="qualityToggle"
                        variant="text"
                      />
                      <label for="quality" class="">
                        <ArrowRight class="w-4 h-4 -mr-4" />
                      </label>
                    </div>
                    <Popover ref="qualityMenu" id="speed_menu" position="top">
                      <div class="p-4 ronded-2xl flex flex-col gap-2 min-w-[200px]">
                        <div class="flex items-center justify-between">
                          <h3 class="text-sm-st-one font-demi-bold">Quality</h3>
                          <ArrowLeft class="text-[16px]" @click="settingToggle" />
                        </div>
                        <div class="w-full h-[1px] bg-secondary-100"></div>
                        <ul class="flex flex-col w-full gap-2">
                          <li
                            v-for="[key, quality] in Object.entries(
                              props.stream.streamProviders.cache.urls
                            )"
                            :key="quality"
                            class="flex flex-row-reverse items-center justify-between p-4 rounded-lg hover:bg-secondary-100"
                            @click="
                              () => {
                                if (checkAcces(key)) setQuality({ key, quality })
                              }
                            "
                            :class="
                              cn({
                                'bg-secondary-100 ': key == videoQuality
                              })
                            "
                          >
                            <span
                              class="text-sm-cp"
                              :class="
                                cn({
                                  'text-secondary-400': !checkAcces(key)
                                })
                              "
                              >{{ key }}</span
                            >
                            <div
                              class="flex items-center justify-center p-1 rounded bg-secondary-100 font-500 text-sm-cp"
                              v-if="!checkAcces(key)"
                            >
                              pro
                            </div>
                          </li>
                        </ul>
                      </div>
                    </Popover>
                    <span class="text-sm-st-two font-demi-bold"
                      >Auto<span class="text-sm-cp">(360p)</span></span
                    >
                  </div>
                  <div class="flex gap-1">
                    <span class="text-st-two"> Quality</span>
                    <QualityIcon class="stroke-neutral-black" />
                  </div>
                </div>
              </div>
            </Popover>
          </div>

          <div id="sound" @mouseenter="sliderDisplay" @mouseleave="sliderHide">
            <SoundIcon class="soundIcon" />
            <MuteIcon class="muteIcon" />
            <div class="volume-slider" @click="changeVolume" style="display: none">
              <div class="volume-bar">
                <div class="volume-level" style="width: 38.75%"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="controls-item">
          <div class="time">
            <span class="total-duration">1:31</span><span>/</span
            ><span class="current-time">0:11</span>
          </div>
          <div class="play-pause" @click="togglePlayPause">
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
        <div class="totalbar" @click="seekVideo">
          <div class="current-bar" style="width: 12.2406%"></div>
        </div>
      </div>
    </div>
    <div
      id="play-video"
      class="flex flex-col items-center w-fit"
      @click="togglePlayPause"
    >
      <WhitePlayIcon class="w-10 h-10 " />
      <h2 class="text-neutral-white text-sm-st-one">ویدئو معرفی دوره</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { Button, Loading } from '@/components'
import {
  MinimizeIcon,
  SoundIcon,
  MuteIcon,
  SettingIcon,
  ArrowRight,
  ArrowLeft,
  WhitePlayIcon,
  QualityIcon
} from '@/components/icons'
import { cn } from '@/utils'
import { Stream, AccessList } from '@/queries'
import { useScreenOrientation } from '@vueuse/core'


type Props = {
  stream: Stream
  access_list: Array<AccessList>
}

const props = defineProps<Props>()



const wrapper = ref()
const video = ref<HTMLVideoElement>()
const playPauseButton = ref<HTMLElement>()
const fullscreenButton = ref<HTMLElement>()
const volumeControl = ref<HTMLElement>()
const volumeSlider = ref<HTMLElement>()
const volumeLevel = ref<HTMLElement>()
const currentTimeDisplay = ref<HTMLElement>()
const totalDurationDisplay = ref<HTMLElement>()
const playSpeed = ref<HTMLElement>()
const progressBar = ref<HTMLElement>()
const currentBar = ref<HTMLElement>()
const playSpeedMenu = ref<HTMLElement>()
const playSpeedItems = ref<HTMLElement>()
const centerPlayButton = ref<HTMLElement>()
const videoControls = ref<HTMLElement>()

const videoSpeed = ref(1)
const videoQuality = ref('')
const qualityMenu = ref()
const speedMenu = ref()
const settingMenu = ref()
const currentVideoSrc = ref(0)
const settingIcon=ref()


const speeds = ref([
  {
    speed: 0.25,
    isPro: false
  },
  {
    speed: 0.5,
    isPro: false
  },
  {
    speed: 0.75,
    isPro: false
  },
  {
    speed: 1,
    isPro: false
  },
  {
    speed: 1.25,
    isPro: false
  },
  {
    speed: 1.5,
    isPro: false
  },
  {
    speed: 2,
    isPro: false
  },
  {
    speed: 2.5,
    isPro: false
  }
])

onMounted(() => {
  if (wrapper.value) {
    video.value = wrapper.value.querySelector('.custom-video')
    playPauseButton.value = wrapper.value.querySelector('.play-pause')
    fullscreenButton.value = wrapper.value.querySelector('.fullscreen')
    volumeControl.value = wrapper.value.querySelector('#sound')
    volumeSlider.value = volumeControl.value?.querySelector('.volume-slider')
    volumeLevel.value = volumeSlider.value?.querySelector('.volume-level')
    currentTimeDisplay.value = wrapper.value.querySelector('.current-time')
    totalDurationDisplay.value = wrapper.value.querySelector('.total-duration')
    playSpeed.value = wrapper.value.querySelector('.play-speed span')
    progressBar.value = wrapper.value.querySelector('.progress-bar .totalbar')
    currentBar.value = wrapper.value.querySelector('.progress-bar .current-bar')
    playSpeedMenu.value = wrapper.value.querySelector('.play-speed ul')
    playSpeedItems.value = wrapper.value.querySelectorAll('.play-speed li')
    centerPlayButton.value = wrapper.value.querySelector('#play-video')
    videoControls.value = wrapper.value.querySelector('.video-controls')

    if (video.value)
      video.value.addEventListener('error', () => handleVideoSrcError())
  }
})

const handleVideoSrcError = () => {

  const allVideoSrc = [
    ...Object.values(props.stream?.streamProviders.cache.urls),
    props.stream?.streamProviders.cloudflare.meta.hls
  ]
  currentVideoSrc.value += 1
  if (currentVideoSrc.value < allVideoSrc.length) {
    if (video.value) video.value.src = allVideoSrc[currentVideoSrc.value]
  }
}

const settingToggle = (event: Event) => {
  settingMenu.value.toggle(event)
}

const speedToggle = (event: Event) => {
  speedMenu.value.toggle(event)
}

const checkAcces = (quality: string): boolean => {
  let isPro = true
  props.access_list.forEach((item) => {
    if (item.slug.includes(quality)) {
      isPro = false
      return
    }
  })
  return isPro
}

const qualityToggle = (event: Event) => {
  qualityMenu.value.toggle(event)
}



// Helper function to format time in minutes:seconds
function formatTime(time: number) {
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}

// Helper function to toggle video playback
function togglePlayPause() {
  if (video.value && (video.value.paused || video.value.ended)) {

    video.value.play()
    playPauseButton.value.querySelector('.play').style.display = 'none'
    playPauseButton.value.querySelector('.pause').style.display = 'block'
    centerPlayButton.value.style.display = 'none'
    videoControls.value.classList.add('video-playing')
  } else {
    video.value.pause()
    playPauseButton.value.querySelector('.play').style.display = 'block'
    playPauseButton.value.querySelector('.pause').style.display = 'none'
    videoControls.value.classList.remove('video-playing')
    centerPlayButton.value.style.display = 'flex'
  }
}

// Update total duration when metadata is loaded

const totlaDuration = () => {
  if(totalDurationDisplay.value&&video.value)
  totalDurationDisplay.value.textContent = formatTime(video.value.duration)
}

// Toggle video playback with Enter or Space keys and seek with Arrow keys
document.addEventListener('keydown', (event) => {
  const isInput =
    event.target?.tagName === 'INPUT' || event.target?.tagName === 'TEXTAREA'
  if (!isInput) {
    switch (event.code) {
      case 'Space':
      case 'Enter':
        event.preventDefault()
        togglePlayPause()
        break
      case 'ArrowRight':
      if(video.value)
        video.value.currentTime = Math.min(
          video.value.currentTime + 5,
          video.value.duration
        ) // Seek forward 5 seconds
        break
      case 'ArrowLeft':
      if(video.value)
        video.value.currentTime = Math.max(video.value.currentTime - 5, 0) // Seek backward 5 seconds
        break
    }
  }
})

const sliderDisplay = () => {
  if (volumeSlider.value) volumeSlider.value.style.display = 'block'
}

const sliderHide = () => {
  if (volumeSlider.value) volumeSlider.value.style.display = 'none'
}

// Update volume using custom slider
const changeVolume = (event) => {
  const clickX = event.offsetX
  const width = volumeSlider.value.offsetWidth
  const volume = clickX / width
  video.value.volume = volume
  if (volume === 0) {
    volumeControl.value.classList.add('muted')
  } else {
    volumeControl.value.classList.remove('muted')
  }
  volumeLevel.value.style.width = `${volume * 100}%`
}

//toggle fullscreen
const toggleFullScreen = () => {

  if (!document.fullscreenElement) {
    wrapper.value.requestFullscreen().catch((err) => {
      console.error(`Failed to enter fullscreen mode: ${err.message}`)
    })

    if (fullscreenButton.value) fullscreenButton.value.classList.add('active ')
  } else {
    document.exitFullscreen()
    if (fullscreenButton.value) fullscreenButton.value.classList.remove('active ')
  }
}

// Update progress bar and current time display as the video plays

const updateProgressbar = () => {
  const percentage = (video.value.currentTime / video.value.duration) * 100
  if (currentBar.value) currentBar.value.style.width = `${percentage}%`
  if (currentTimeDisplay.value)
    currentTimeDisplay.value.textContent = formatTime(video.value.currentTime)
}
// Seek video when progress bar is clicked

const seekVideo = (event) => {
  const clickX = event.offsetX
  const width = progressBar.value.offsetWidth
  const duration = video.value.duration
  video.value.currentTime = (clickX / width) * duration
}

const setSpeed = (speed: number) => {
  speedMenu.value.toggle(event)
  settingMenu.value.toggle(event)
  video.value.playbackRate = speed
  videoSpeed.value = speed
}

//change video quality that comes from api
const setQuality = (quality: { key: string; quality: string }) => {
  const currentVideoTime = video.value?.currentTime
  qualityMenu.value.toggle(event)
  settingMenu.value.toggle(event)
  videoQuality.value = quality.key
  video.value.src = quality.quality
  video.value.currentTime = currentVideoTime
  video.value?.play()
}

// Hide the play speed menu when clicking outside
document.addEventListener('click', (event) => {
  if (
    !wrapper.value.contains(event.target) &&
    playSpeedMenu.value?.style.display === 'flex'
  ) {
    playSpeedMenu.value.style.display = 'none'
  }
})

// Show play icon and center play button when the video ends
const showPlayIcon = () => {
  playPauseButton.value.querySelector('.play').style.display = 'block'
  playPauseButton.value.querySelector('.pause').style.display = 'none'
  centerPlayButton.value.style.display = 'flex'
  videoControls.value.classList.remove('video-playing')
}
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
    }
  }
}

.landscape {
  transform: rotate(90deg) translateY(-100%);
  width: 100vh;
  height: 100vw;
  overflow-x: hidden;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
