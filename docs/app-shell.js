(() => {
  'use strict';

  const STORAGE = { language: 'ffmpeg-webcli-language', theme: 'ffmpeg-webcli-theme' };
  const translations = {
    'Auto': '自动', 'Light': '浅色', 'Dark': '深色', 'Language': '语言', 'Theme': '主题',
    'Display preferences': '显示设置', 'offline-first': '离线优先',
    'Processing mode': '处理模式', 'Operation category': '操作分类', 'Crop selection': '裁剪区域',
    'Process multiple files': '处理多个文件', 'Download all as ZIP': '全部打包下载',
    '100% local. Data never leaves your browser.': '100% 本地处理，文件不会离开浏览器。',
    'Fork on GitHub': '在 GitHub 上查看', 'GitHub repository': 'GitHub 仓库', 'Input Video': '输入视频', 'Operations': '操作',
    'Batch': '批量', 'Click to choose': '点击选择文件', 'or drag & drop local file': '或将本地文件拖放到此处', 'No file chosen': '尚未选择文件',
    'Remove': '移除', 'Clear Queue': '清空队列', 'Trim': '剪辑', 'applied to all operations': '应用于所有操作',
    'Disabled (batch mode)': '批量模式下已禁用', 'Drag the handles to set start and end. Leave untouched to keep the full video.': '拖动滑块设置开始与结束位置；保持不动则使用完整视频。',
    'Start': '开始', 'End': '结束', 'Full duration': '完整时长', 'Selection:': '选中范围：',
    'Single': '单项操作', 'Stack (chain)': '操作链', 'All operations': '全部操作', 'Common': '常用',
    'Video': '视频', 'Audio': '音频', 'Text & overlays': '文字与叠加', 'Advanced': '高级',
    'Search operations': '搜索操作', 'Convert': '格式转换', 'Resize & Compress': '缩放与压缩',
    'Extract Audio': '提取音频', 'Mute': '静音', 'To GIF': '转为 GIF', 'Speed': '变速',
    'Rotate / Flip': '旋转 / 翻转', 'Crop': '裁剪', 'Thumbnail': '提取缩略图', 'Reverse': '倒放',
    'Fade In/Out': '淡入 / 淡出', 'Adjust': '画面调整', 'Strip Metadata': '移除元数据',
    'Auto-Caption': '自动字幕', 'Embed Subtitles': '嵌入字幕', 'Volume': '音量', 'Loop': '循环播放',
    'Text Watermark': '文字水印', 'Logo Overlay': '图片水印', 'Mix Audio': '混合音频',
    'Concatenate': '拼接视频', 'Side by Side': '并排对比', 'Picture in Picture': '画中画',
    'Media Info': '媒体信息', 'Pad / Letterbox': '补边', 'Normalize Audio': '音频响度标准化',
    'Denoise': '降噪', 'Boomerang': '往返播放', 'Sharpen / Blur': '锐化 / 模糊', 'Raw FFmpeg': 'FFmpeg 命令',
    'Convert to format': '转换格式', 'Use the Output Format selector below to choose format.': '请使用下方的输出格式选项。',
    'Output format': '输出格式', 'Output Format': '输出格式', 'Format': '格式', 'MP4 (H.264 + AAC)': 'MP4（H.264 + AAC）',
    'MKV (H.264 + AAC)': 'MKV（H.264 + AAC）', 'MOV (H.264 + AAC)': 'MOV（H.264 + AAC）',
    'WebM (VP9 + Opus)': 'WebM（VP9 + Opus）', 'GIF (animated)': 'GIF（动图）', 'AVI': 'AVI',
    'Width (px)': '宽度（像素）', 'Height (px)': '高度（像素）', 'Quality (CRF)': '画质（CRF）',
    'Preset': '预设', 'ultrafast - fastest': 'ultrafast - 最快', 'medium - balanced': 'medium - 均衡',
    'slow - better compression': 'slow - 压缩率更高', 'veryslow - best compression': 'veryslow - 压缩率最高',
    'Extract audio track': '提取音轨', 'Audio Format': '音频格式', 'MP3': 'MP3', 'AAC': 'AAC',
    'WAV (uncompressed)': 'WAV（无压缩）', 'OGG Vorbis': 'OGG Vorbis', 'FLAC (lossless)': 'FLAC（无损）',
    'Remove audio track': '移除音轨', 'Output will be the same video with the audio stream stripped.': '输出视频将移除音轨。',
    'Animated GIF': 'GIF 动图', 'FPS': '帧率（FPS）', 'Height is calculated automatically to preserve aspect ratio.': '高度会自动计算以保持画面比例。',
    'Playback speed': '播放速度', 'Multiplier': '倍速', '0.25× - slow motion': '0.25× - 慢动作',
    'Transform': '变换', '90° Clockwise': '顺时针 90°', '90° Counter-clockwise': '逆时针 90°',
    'Flip Horizontal': '水平翻转', 'Flip Vertical': '垂直翻转', 'Flip Both (180°)': '双向翻转（180°）',
    'Load a video to crop.': '请先载入视频以进行裁剪。', 'Load a video to preview the crop area.': '载入视频后可预览裁剪区域。',
    'Drag the box to move it. Drag the handles to resize.': '拖动选框可移动，拖动边缘可调整大小。',
    'Extract Thumbnail': '提取缩略图', 'Timestamp (seconds)': '时间点（秒）', 'JPEG': 'JPEG', 'PNG (lossless)': 'PNG（无损）',
    'Extracts a single frame at the given timestamp as an image file.': '从指定时间点提取单帧并保存为图片。',
    'Plays video and audio backwards. The whole clip is buffered in memory - keep clips under ~2 minutes for best results.': '视频和音频将倒放。整个片段会载入内存，建议控制在约 2 分钟以内。',
    'Fade In / Out': '淡入 / 淡出', 'Fade in (sec)': '淡入时长（秒）', 'Fade out (sec)': '淡出时长（秒）',
    'Set either value to 0 to skip that direction. Applied after trimming.': '设为 0 可跳过该效果；淡入淡出会在剪辑后应用。',
    'Brightness': '亮度', 'Contrast': '对比度', 'Saturation': '饱和度', 'Grayscale': '灰度', 'Reset': '重置',
    'Subtitle file': '字幕文件', '(SRT, VTT, or ASS)': '（SRT、VTT 或 ASS）', 'Choose file': '选择文件',
    'Subtitle embedding method': '字幕嵌入方式', 'Stream embed (soft subtitles) - fast, selectable by user': '软字幕（速度快，可在播放器中切换）',
    'Hard-burn - slower, baked into frames, always visible': '硬字幕（速度较慢，直接绘制在画面中）',
    'Soft subtitles recommended for VLC & browsers. Hard-burn for social media & guaranteed visibility.': 'VLC 和浏览器推荐使用软字幕；社交媒体分享可使用硬字幕。',
    'Auto-Caption (Whisper)': '自动字幕（Whisper）', 'Whisper Model': 'Whisper 模型',
    'Tiny (39 MB) - fast, lower quality': 'Tiny（39 MB）- 速度快，精度较低', 'Base (140 MB) - balanced': 'Base（140 MB）- 均衡',
    'Small (466 MB) - higher quality, slower': 'Small（466 MB）- 精度较高，速度较慢',
    'Hard-burn subtitles into video (re-encodes, slower)': '将字幕硬编码到视频（需要重新编码）',
    'Unchecked: Fast, embeds as soft subtitle stream. Checked: Slower, burns subtitles directly into frames.': '未勾选：快速嵌入软字幕；勾选：重新编码并将字幕绘制到画面中。',
    'Base model is recommended for most videos. Downloads and caches on first use.': '大多数视频推荐使用 Base 模型；首次使用时会下载并缓存。',
    'Transcript (Editable)': '字幕文本（可编辑）', 'Confirm & Embed': '确认并嵌入', 'Process is 100% local:': '全程在本地处理：',
    'Transcript will appear here. You can edit it before embedding.': '转录文本会显示在这里，可在嵌入前进行编辑。',
    'Caption font size': '字幕字号', '(hard-burn only)': '（仅硬字幕）', 'Small': '小', 'Medium': '中', 'Large': '大',
    'Multiplier -': '倍数 -', '1.0 = original · >1 = boost · <1 = reduce · 0 = silence. Audio is re-encoded; video is stream-copied.': '1.0 为原音量；大于 1 为增强；小于 1 为降低；0 为静音。音频会重新编码，视频流直接复制。',
    'Loop / Repeat': '循环 / 重复', 'Total plays': '播放次数',
    'Streams are copied without re-encoding. The clip plays N times back-to-back. Trim is ignored for this operation.': '视频流直接复制，不重新编码。片段连续播放指定次数；此操作不应用剪辑范围。',
    'Watermark preset': '水印预设', 'Moving patrol': '动态巡游', 'Fixed corner': '固定角落', 'Centered mark': '居中水印', 'Opaque label': '背景标签', 'Custom': '自定义',
    'Text': '水印文字', 'Motion preset': '移动方式', 'Patrol / bounce': '沿边巡游', 'Horizontal loop': '水平往返',
    'Vertical loop': '垂直往返', 'Static position': '固定位置', 'Font size': '字号', 'Opacity': '不透明度',
    'Text color': '文字颜色', 'Font preset': '字体预设',
    'Noto Sans SC (Gothic)': '思源黑体（Noto Sans SC）', 'Noto Serif SC (Serif)': '思源宋体（Noto Serif SC）',
    'Upload a font file…': '上传字体文件…', 'Noto Sans SC · SIL OFL 1.1': '思源黑体 · SIL OFL 1.1',
    'Noto Serif SC · SIL OFL 1.1': '思源宋体 · SIL OFL 1.1',
    'Choose custom font': '选择自定义字体',
    'Choose a custom TTF / OTF font file.': '请选择自定义 TTF / OTF 字体文件。',
    'Edge margin': '边缘留白', 'Travel time': '移动时间',
    's / edge': '秒 / 边', 'Horizontal position': '水平位置', 'Vertical position': '垂直位置', 'Advanced style': '高级样式',
    'Background': '背景', 'Shadow': '阴影', 'Shadow color': '阴影颜色', 'Outline': '描边', 'Outline color': '描边颜色',
    'Preview shows style; the output uses the selected motion and preserves the original audio.': '预览水印样式；输出将按所选方式移动，并保留原音频。',
    'Built-in Noto Sans SC and Noto Serif SC fonts support Chinese. The output keeps the original audio.': '内置思源黑体和思源宋体支持中文；输出会保留原音频。',
    'Filter preview': '滤镜预览', 'Logo / Image Overlay': '图片水印 / 叠加', 'Image file': '图片文件',
    '(PNG with transparency recommended)': '（推荐使用透明 PNG）', 'Choose image': '选择图片', 'Position': '位置',
    'Width (% of video)': '宽度（视频比例）', 'PNG with alpha gives cleanest results. Video is re-encoded to preserve overlay.': '透明 PNG 效果更好；视频会重新编码以写入水印。',
    'Bottom-right': '右下角', 'Top-left': '左上角', 'Top-right': '右上角', 'Bottom-left': '左下角', 'Centre': '居中',
    'Mix Audio (Background Music)': '混合音频（背景音乐）', 'Music / audio file': '音乐 / 音频文件', 'Choose audio': '选择音频',
    'Original audio -': '原音量 -', 'Music volume -': '音乐音量 -', 'Music loops automatically if it is shorter than the video. Video is stream-copied.': '音乐短于视频时会自动循环；视频流直接复制。',
    'Concatenate (Join Clips)': '拼接视频片段', 'Second clip': '第二个片段', '(appended after the loaded file)': '（接在当前视频之后）', 'Choose clip': '选择片段',
    'Uses the concat filter - different resolutions and codecs are handled by re-encoding to H.264/AAC. Trim applies to the first clip only.': '使用 concat 滤镜拼接；不同分辨率和编码会统一重新编码为 H.264/AAC。剪辑范围仅应用于第一个片段。',
    'Second video': '第二个视频', 'Layout': '布局', 'Horizontal (side by side)': '水平并排', 'Vertical (top / bottom)': '垂直上下',
    'Common dimension (px)': '统一尺寸（像素）', 'From first clip': '使用第一个片段', 'From second clip': '使用第二个片段',
    'Both clips are scaled to the same height (horizontal) or width (vertical) then stacked. Re-encodes to H.264/AAC. Trim is ignored.': '两个片段会缩放到相同高度（水平布局）或宽度（垂直布局），再进行拼接并重新编码为 H.264/AAC；此操作不应用剪辑范围。',
    'No audio': '无音频', 'Overlay video': '叠加视频', 'Width (% of main video)': '宽度（主视频比例）',
    'Overlay video loops if shorter than the main clip. Audio from the main clip is preserved. Trim applies to the main clip.': '叠加视频较短时会自动循环；保留主视频音频，剪辑范围仅应用于主视频。',
    'Load a video file to see its properties.': '载入视频后可查看媒体属性。', 'Click': '点击', 'to run a deep scan and log full codec & stream details below.': '执行详细扫描，并在下方日志中查看编解码器和流信息。',
    'Example Commands': '命令示例', 'Arguments -- inserted after': '参数 - 插入到', ', before the output filename': '之后、输出文件名之前',
    'Output extension': '输出扩展名', 'Bypass trim': '跳过剪辑范围', 'Full command preview': '完整命令预览',
    'Args are split on whitespace. Wrap values containing spaces in double quotes, e.g.': '参数按空格拆分；包含空格的值请用双引号括起，例如：',
    'Pad to Aspect Ratio': '补边至目标比例', 'Target Ratio': '目标比例', '16:9 - Landscape (YouTube, TV)': '16:9 - 横屏（YouTube、电视）',
    '9:16 - Portrait (Reels, Stories)': '9:16 - 竖屏（Reels、Stories）', '1:1 - Square (Instagram)': '1:1 - 方形（Instagram）',
    '4:3 - Classic': '4:3 - 经典比例', '4:5 - Portrait feed': '4:5 - 竖版信息流', '21:9 - Cinematic': '21:9 - 电影宽屏',
    'Pad Color': '补边颜色', 'Black': '黑色', 'White': '白色', 'Gray': '灰色',
    'Video is scaled down to fit; empty space is filled with the chosen color. Re-encodes to H.264.': '视频会缩放至目标区域，空白部分使用所选颜色填充，并重新编码为 H.264。',
    'Normalize Audio (EBU R128)': '音频响度标准化（EBU R128）', 'Target Loudness': '目标响度',
    '-14 LUFS - YouTube / Spotify': '-14 LUFS - YouTube / Spotify', '-16 LUFS — Podcasts / Apple': '-16 LUFS — 播客 / Apple',
    '-23 LUFS — Broadcast (EBU R128)': '-23 LUFS — 广播（EBU R128）', 'Uses the': '使用', 'filter. Video stream is copied without re-encoding.': '滤镜处理；视频流直接复制，不重新编码。',
    'Denoise (hqdn3d)': '降噪（hqdn3d）', 'Strength': '强度', 'Heavy': '强', 'Applies spatial + temporal noise reduction via': '通过以下滤镜进行空间和时间降噪：',
    '. Higher strength = smoother but softer image.': '。强度越高，画面越平滑，也会越柔和。', 'Effect': '效果', 'Sharpen (unsharp)': '锐化（unsharp）', 'Blur (boxblur)': '模糊（boxblur）',
    'Intensity': '程度', 'Sharpen uses': '锐化使用', '; blur uses': '；模糊使用', '. Audio is copied.': '。音频流直接复制。',
    'Plays the clip forward then immediately in reverse — classic boomerang loop. Trim is respected. Audio is removed from the output.': '片段先正向播放，再立即倒放形成往返效果。会应用剪辑范围，输出不包含音频。',
    'Operation Stack': '操作链', 'No operations yet — configure an op above and click “Add to Stack”.': '还没有操作；请先配置上方选项，再点击“加入操作链”。',
    'Composed command preview': '组合命令预览', '(stack is empty)': '（操作链为空）',
    'Operations run in the listed order as one filter chain with a single re-encode. Trim (if set) is applied first.': '操作会按列表顺序组成滤镜链并统一重新编码；若设置了剪辑范围，会先执行剪辑。',
    'Estimated output size': '预计输出大小', 'Processing…': '处理中…', 'Add to Stack': '加入操作链', 'Process Stack': '处理操作链',
    'Output ready:': '输出已就绪：', 'Download output': '下载输出', 'Output': '输出', 'Process a video to see the result here': '处理视频后，结果会显示在这里',
    'Download': '下载', 'ZIP All': '打包下载', 'Batch Outputs (': '批量输出（', '-- Select file to preview --': '-- 选择要预览的文件 --',
    'FFmpeg Log': 'FFmpeg 日志', 'Clear': '清空', 'Current command:': '当前命令：',
    'Waiting for ffmpeg command…': '等待 FFmpeg 命令…', 'Ready. Load ffmpeg to begin.': '准备就绪。载入 FFmpeg 以开始处理。',
    'Choose video': '选择视频', 'Process Video': '处理视频', 'Load FFmpeg (cached after first load)': '载入 FFmpeg（首次载入后会缓存）', 'Start cached FFmpeg': '从缓存启动 FFmpeg', 'Load ffmpeg (~31 MB)': '载入 FFmpeg（约 31 MB）',
    'Dimensions are filled from the source video. Clear a field or set to -1 to preserve aspect ratio. Lower CRF = higher quality.': '尺寸会从源视频自动读取。清空任一栏或设为 -1 可保持宽高比；CRF 越低画质越高。',
    'Removes all embedded metadata (GPS, camera info, creation date, etc.) from the output file. Video and audio are re-encoded.': '移除输出文件中的所有元数据（GPS、相机信息、创建日期等），并重新编码视频和音频。',
    'audio is extracted, transcribed on-device with Whisper via Transformers.js, and embedded as soft subtitles. Zero data leaves your browser.': '音频会在设备上提取并由 Whisper 转录为软字幕，全程在浏览器本地完成，不会上传数据。',
    'FFmpeg starts automatically when cached; load it on demand otherwise': '有缓存时会自动启动 FFmpeg；没有缓存时，使用前再手动载入',
    'FFmpeg is not running; cached files are reused when available': 'FFmpeg 当前未运行；有缓存时会从浏览器缓存读取核心文件',
    'Preparing ffmpeg…': '正在准备 FFmpeg…',
    'Initializing ffmpeg from browser cache…': '正在从浏览器缓存初始化 FFmpeg…',
    'Starting cached FFmpeg…': '正在启动缓存中的 FFmpeg…',
    'Downloading FFmpeg…': '正在下载 FFmpeg…',
    'Downloading ffmpeg-core (~31 MB)…': '正在下载 FFmpeg 核心（约 31 MB）…',
    'Initialising ffmpeg (downloading WASM ~31 MB)…': '正在初始化 FFmpeg（下载约 31 MB 的 WASM）…',
    'FFmpeg ready (core files cached for next time)': 'FFmpeg 已就绪（核心文件已缓存，刷新后可复用）',
    'ffmpeg not loaded - click "Load ffmpeg" to begin': 'FFmpeg 当前未运行；有缓存时会从浏览器缓存读取核心文件', 'Loading ffmpeg (~31 MB)…': '正在载入 FFmpeg（约 31 MB）…',
    'ffmpeg loaded and ready': 'FFmpeg 已载入并就绪',
    'Clear Queue': '清空队列', 'Load ffmpeg & Process': '载入 FFmpeg 并处理', 'Process Queue': '处理队列',
  };

  // Extra UI/status/error phrases live separately from the static page labels.
  // Keeping runtime messages here makes additions auditable without mixing
  // operation names and message formatting rules into the DOM observer.
  Object.assign(translations, {
    'MP4, WebM, MOV, AVI, MKV, GIF…': '支持 MP4、WebM、MOV、AVI、MKV、GIF 等格式',
    '(18=best · 28=default · 51=worst)': '（18 为最佳画质 · 28 为默认值 · 51 为最低画质）',
    'Included Noto fonts support Simplified Chinese.': '内置思源字体，可显示简体中文。',
    'auto': '自动', 'fast': '快速', 'px': '像素',
    'Screen will stay on during processing': '处理期间将保持屏幕常亮',
    'Using same-origin worker proxy (./worker.js).': '使用同源 Worker 代理（./worker.js）。',
    'Using direct CDN URL for ffmpeg-core.js.': '从 CDN 直接载入 ffmpeg-core.js。',
    'Using direct CDN URL for ffmpeg-core.wasm.': '从 CDN 直接载入 ffmpeg-core.wasm。',
    'The multi-thread core is not cached yet; starting the cached single-thread core.': '多线程核心尚未缓存，先启动已缓存的单线程核心。',
    'Multi-thread mode is unavailable here; using the compatible single-thread core.': '当前环境不支持多线程模式，改用兼容性更好的单线程核心。',
    'Multi-thread FFmpeg ready (core files cached)': '多线程 FFmpeg 已就绪（核心文件已缓存）',
    'Multi-thread FFmpeg loaded and ready': '多线程 FFmpeg 已载入并就绪',
    'Preparing multi-thread FFmpeg…': '正在准备多线程 FFmpeg…',
    'Preparing single-thread FFmpeg…': '正在准备单线程 FFmpeg…',
    'Multi-thread FFmpeg ready': '多线程 FFmpeg 已就绪',
    'Single-thread FFmpeg ready': '单线程 FFmpeg 已就绪',
    'Stroke follows each glyph contour, including enclosed spaces. For Chinese text, keep it thin (1–2 px).': '描边会沿每个字形的内外轮廓绘制，包括字腔内侧；中文建议使用较细描边（1–2 像素）。',
    'Enable faster core': '启用多线程', 'Reloads the page to download the multi-thread core': '将重新载入页面并下载多线程核心。',
    'Remove the selected video and clear the batch queue before switching cores; reloading clears them.': '切换核心前请先移除已选视频并清空批量队列；页面重载会清除这些文件。',
    'ffmpeg loaded.': 'FFmpeg 已载入。', 'Done!': '处理完成！', 'Loaded': '已载入',
    'Batch mode enabled. Drop multiple files to queue them.': '已启用批量模式，可拖入多个文件加入队列。',
    'Batch mode disabled. Single file mode active.': '已关闭批量模式，当前为单文件模式。',
    'Batch queue cleared.': '已清空批量队列。', 'Batch queue is empty.': '批量队列为空。',
    'No completed files to download.': '没有可下载的已完成文件。', 'No completed files to download': '没有可下载的已完成文件',
    'Creating ZIP archive…': '正在创建 ZIP 压缩包…',
    'JSZip library not loaded - cannot create ZIP. Downloading individual files instead.': 'ZIP 组件尚未载入，无法打包；将改为逐个下载文件。',
    'App installed successfully!': '应用已成功安装！',
    'New version available - reload to update': '发现新版本，请刷新页面更新',
    'Back online': '网络已恢复', 'Offline - working with cached resources': '当前离线，正在使用缓存资源',
    'Muxing…': '正在封装…', 'Muxing for the other page. Nothing leaves this browser.': '正在为另一个页面封装文件，所有数据均留在此浏览器中。',
    'Sent. You can close this window.': '已发送，可以关闭此窗口。',
    'Transcription complete': '转录完成', 'Encoding with subtitles…': '正在编码字幕…',
    'Loading model…': '正在载入模型…', 'Transcribing…': '正在转录…',
    'Loading ffmpeg…': '正在载入 FFmpeg…', 'Embedding…': '正在嵌入…',
    'Batch Processing…': '正在批量处理…', 'Processing Stack…': '正在处理操作链…', 'Batch Stack…': '正在批量处理操作链…',
    'ffmpeg.wasm ready - you can now embed subtitles': 'ffmpeg.wasm 已就绪，现在可以嵌入字幕',
    'Warning: Could not preload ffmpeg. It will attempt to load when you click Confirm & Embed.': '警告：无法预载 FFmpeg；点击“确认并嵌入”时会再次尝试载入。',
    'Warning: No overlay image selected. Skipping logo overlay.': '警告：没有选择叠加图片，已跳过图片水印。',
    'Logo overlay in batch mode requires manual per-file configuration. Using stream copy.': '批量模式下的图片叠加需要逐文件设置；当前将直接复制视频流。',
    'VP9 WebM failed; retrying with VP8 (libvpx) WebM…': 'VP9 WebM 编码失败，正在改用 VP8（libvpx）重试…',
    'WebM (libvpx) could not be produced in this ffmpeg.wasm build; encoding H.264 and packaging it under the .webm name instead.': '此 ffmpeg.wasm 版本无法生成 libvpx WebM；将改用 H.264 编码，并使用 .webm 扩展名打包。',
    'WebM in ffmpeg.wasm: using VP8 low-memory path for stability.': 'ffmpeg.wasm 正在使用低内存 VP8 路径提高 WebM 编码稳定性。',
    'VP9 encode failed in ffmpeg.wasm; retrying with WebM VP8 low-memory fallback…': 'ffmpeg.wasm 中的 VP9 编码失败，正在改用低内存 VP8 模式重试…',
    'WebM encode still unstable; retrying emergency mode (VP8, no-audio, 426w)…': 'WebM 编码仍不稳定，正在尝试应急模式（VP8、无音频、宽度 426 像素）…',
    'WebM (libvpx) is unsupported in this ffmpeg.wasm build; producing MP4 (H.264) instead.': '此 ffmpeg.wasm 版本不支持 libvpx WebM，将改为生成 MP4（H.264）。',
    'WASM binary loaded, initialising…': 'WASM 二进制文件已载入，正在初始化…',
    '[worker] Fetching WASM binary…': '[Worker] 正在获取 WASM 二进制文件…',
    'ffmpeg.wasm could not be started (is cdn.jsdelivr.net blocked?).': '无法启动 ffmpeg.wasm（cdn.jsdelivr.net 是否被拦截？）',
    'command must be a JSON object': '命令必须是 JSON 对象',
    'This tool is already running another job.': '此工具正在处理另一个任务。',
    'Processing': '处理中', 'Complete': '已完成', 'Loading': '正在载入', 'Transcribing': '正在转录',
    'Preemptive load incomplete - loading ffmpeg now…': '预加载尚未完成，正在载入 FFmpeg…',
    'Click to add files': '点击添加文件', 'or drag & drop multiple local files': '或拖放多个本地文件',
    'File:': '文件：', 'Size:': '大小：', 'Duration:': '时长：', 'Resolution:': '分辨率：',
    'Est. bitrate:': '估算码率：', 'Type:': '类型：',
    'Input:': '输入：', 'Output:': '输出：', 'Status:': '状态：', '✓ Complete': '✓ 已完成',
    'Move up': '上移', 'Move down': '下移', '+ 2nd file': '+ 第二个文件',
    'Color-bar watermark': '彩条水印', 'Cap framerate to 24 fps': '限制帧率为 24 fps',
    'Convert to grayscale': '转换为灰度', 'Loudness normalize': '响度标准化',
    'Lossless remux (copy)': '无损封装（复制）', 'Letterbox / pillarbox': '添加上下 / 左右黑边',
    'Stabilize (deshake)': '视频防抖', 'Vignette effect': '暗角效果',
    'Extract audio as WAV': '提取为 WAV 音频', 'Extract first frame': '提取第一帧',
    'Replace audio track': '替换音轨', 'smaller': '更小', 'larger': '更大', 'same size': '大小相同',
    'Batch mode enabled. Drop multiple files to queue them.': '已启用批量模式，可拖入多个文件加入队列。',
    'Batch mode disabled. Single file mode active.': '已关闭批量模式，当前为单文件模式。',
    'Writing input file…': '正在写入输入文件…', 'Writing subtitle file…': '正在写入字幕文件…',
    'Writing logo file…': '正在写入图片水印文件…', 'Writing music file…': '正在写入音乐文件…',
    'Writing second clip…': '正在写入第二个片段…', 'Writing second video…': '正在写入第二个视频…',
    'Writing overlay video…': '正在写入叠加视频…', 'Writing SRT subtitle file…': '正在写入 SRT 字幕文件…',
    'Rendering subtitle overlays (this re-encodes the video)…': '正在绘制字幕（需要重新编码视频）…',
    'Using soft subtitle stream embedding…': '正在以软字幕方式嵌入…',
    'Using soft subtitle stream embedding': '正在以软字幕方式嵌入',
    'Deep scan complete — see log above for full codec / stream details.': '详细扫描完成，编解码器和流信息见上方日志。',
    'Converting frame to JPEG…': '正在将画面转换为 JPEG…', 'Extracting audio track...': '正在提取音轨…',
    'Reading audio data...': '正在读取音频数据…', 'Verifying ffmpeg.wasm is loaded and ready…': '正在确认 ffmpeg.wasm 已载入并就绪…',
    'Preemptive load incomplete - loading ffmpeg now…': '预加载尚未完成，正在载入 FFmpeg…',
    'Ensuring ffmpeg is fully initialized…': '正在确认 FFmpeg 已完成初始化…',
    'Restoring input file to ffmpeg filesystem:': '正在将输入文件恢复到 FFmpeg 文件系统：',
    'Input file restored successfully': '已成功恢复输入文件',
    'Releasing transcription engine from memory…': '正在释放转录引擎内存…',
    'Embedding subtitles…': '正在嵌入字幕…', 'Rendering caption overlays…': '正在绘制字幕…',
    'App installed successfully!': '应用已成功安装！',
    'Load a video file to see its properties.': '载入视频后可查看媒体属性。',
    'Load a video to crop.': '请先载入视频以进行裁剪。',
    'Load a video to preview the crop area.': '载入视频后可预览裁剪区域。',
    'Waiting for ffmpeg command…': '等待 FFmpeg 命令…',
    'JPEG conversion failed': 'JPEG 转换失败',
    'Failed to load extracted frame for JPEG conversion': '无法载入提取的画面并转换为 JPEG',
    'Enter the watermark text first.': '请先输入水印文字。',
    'Choose a custom font file or select a built-in font.': '请选择自定义字体文件或内置字体。',
    'Choose a custom TTF / OTF font file.': '请选择自定义 TTF / OTF 字体文件。',
    'Choose a custom font file or select a built-in font.': '请选择自定义字体文件或内置字体。',
    'Please choose a subtitle file first.': '请先选择字幕文件。',
    'Could not parse any subtitle cues (supported: SRT, VTT, ASS/SSA).': '未能解析字幕内容（支持 SRT、VTT、ASS/SSA）。',
    'Please choose a logo/image file first.': '请先选择图片水印文件。',
    'Please choose a music/audio file first.': '请先选择音乐或音频文件。',
    'Please choose a second clip to append.': '请选择要拼接的第二个片段。',
    'Please choose a second video file first.': '请先选择第二个视频文件。',
    'Please choose an overlay video file first.': '请先选择要叠加的视频文件。',
    'Audio file is empty or could not be read': '音频文件为空或无法读取',
    'Transcript is empty': '字幕文本为空',
    'FFmpeg failed to initialize properly. Please try again or reload the page.': 'FFmpeg 初始化失败，请重试或刷新页面。',
    'Input file not available - original file lost': '找不到输入文件，原始文件可能已丢失',
    'No caption cues found to burn.': '没有可烧录的字幕内容。',
    'No operations yet — configure an op above and click “Add to Stack”.': '还没有操作；请先配置上方选项，再点击“加入操作链”。',
    '(stack is empty — add operations above)': '（操作链为空，请先添加操作）',
    '(load a file first)': '（请先载入文件）',
    'Process a video to see the result here': '处理视频后，结果会显示在这里',
    '-- Select file to preview --': '-- 选择要预览的文件 --',
    'Load failed:': '载入失败：', 'Load error:': '载入错误：', 'Error:': '错误：',
    'ffmpeg not loaded - click "Load ffmpeg" to begin': 'FFmpeg 尚未载入，请先启动 FFmpeg',
    'ffmpeg loaded and ready': 'FFmpeg 已载入并就绪',
    'ffmpeg stopped; it loads again on the next job': 'FFmpeg 已停止，将在下次处理时重新载入',
    'This tool is already running another job.': '此工具正在处理另一个任务。',
    'Unknown error': '未知错误', 'unknown error': '未知错误',
    'Cancelled.': '已取消。', 'Cancelled by the other page.': '已由另一个页面取消。',
    'ffmpeg produced no usable output.': 'FFmpeg 未生成可用的输出文件。',
    'ffmpeg.wasm could not be started (is cdn.jsdelivr.net blocked?).': '无法启动 ffmpeg.wasm（cdn.jsdelivr.net 是否被拦截？）',
    'ffmpeg.wasm could not be loaded:': '无法载入 ffmpeg.wasm：',
    'Timed out loading ffmpeg.wasm.': '载入 ffmpeg.wasm 超时。',
    'ffmpeg.wasm stopped:': 'ffmpeg.wasm 已停止：',
    'busy: this window is already processing another file.': '当前窗口正在处理另一个文件。',
    'Audio file is empty or could not be read': '音频文件为空或无法读取',
    'Unknown message type:': '未知消息类型：', 'createFFmpegCore not found in': '未在以下地址找到 createFFmpegCore：',
    'WASM fetch failed:': 'WASM 获取失败：', 'FFmpeg resource fetch failed:': 'FFmpeg 资源获取失败：',
    'Invalid #cmd —': '#cmd 命令无效：', 'Hash command error:': '哈希命令错误：',
    'Hash command rejected:': '哈希命令已拒绝：', 'Hash command: running': '正在运行哈希命令',
    'Hash command preloaded:': '已载入哈希命令：', 'Hand-off:': '任务交接：',
    'This tool does:': '此工具支持的操作：',
    '100% local. Data never leaves your browser.': '100% 本地处理，文件不会离开浏览器。',
    'Included Noto fonts support Simplified Chinese.': '内置思源字体，可显示简体中文。',
  });

  const operationNames = {
    convert: '格式转换', resizecompress: '缩放与压缩', audio: '提取音频', mute: '静音', gif: '转为 GIF', speed: '变速',
    rotate: '旋转 / 翻转', crop: '裁剪', thumbnail: '提取缩略图', reverse: '倒放', fade: '淡入 / 淡出', adjust: '画面调整',
    stripmeta: '移除元数据', autocaption: '自动字幕', subtitles: '嵌入字幕', volume: '音量', loop: '循环播放',
    watermark: '文字水印', overlay: '图片水印', mixaudio: '混合音频', concat: '拼接视频', sxs: '并排对比', pip: '画中画',
    info: '媒体信息', pad: '补边', normalize: '音频响度标准化', denoise: '降噪', boomerang: '往返播放', sharpenblur: '锐化 / 模糊', raw: 'FFmpeg 命令',
  };
  const operationCategories = {
    convert: 'common', resizecompress: 'common', audio: 'audio', mute: 'audio', gif: 'video', speed: 'video',
    rotate: 'video', crop: 'video', thumbnail: 'video', reverse: 'video', fade: 'video', adjust: 'video', stripmeta: 'advanced',
    autocaption: 'text', subtitles: 'text', volume: 'audio', loop: 'advanced', watermark: 'text', overlay: 'text', mixaudio: 'audio',
    concat: 'advanced', sxs: 'advanced', pip: 'advanced', info: 'advanced', pad: 'video', normalize: 'audio', denoise: 'video',
    boomerang: 'video', sharpenblur: 'video', raw: 'advanced',
  };

  const textSources = new WeakMap();
  const textRendered = new WeakMap();
  const attrSources = new WeakMap();
  const attrRendered = new WeakMap();
  let languageMode = safeGet(STORAGE.language, 'auto');
  let themeMode = safeGet(STORAGE.theme, 'auto');
  let observer;

  function safeGet(key, fallback) {
    try { return localStorage.getItem(key) || fallback; } catch (_) { return fallback; }
  }
  function safeSet(key, value) {
    try { localStorage.setItem(key, value); } catch (_) {}
  }
  function resolveLanguage() {
    if (languageMode !== 'auto') return languageMode;
    return /^zh(?:-|$)/i.test(navigator.language || '') ? 'zh-CN' : 'en';
  }
  function resolveTheme() {
    if (themeMode !== 'auto') return themeMode;
    return window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }
  function localize(source) {
    if (resolveLanguage() !== 'zh-CN') return source;
    const key = source.replace(/\s+/g, ' ').trim();
    if (translations[key]) return translations[key];
    let match = key.match(/^(\d+) files? queued$/i);
    if (match) return `队列中有 ${match[1]} 个文件`;
    match = key.match(/^Selection:\s*(.*)$/);
    if (match) return `选中范围：${match[1]}`;
    match = key.match(/^→ stored as (.+)$/);
    if (match) return `→ 保存为 ${match[1]}`;
    match = key.match(/^(\d+) x (\d+) at X (\d+), Y (\d+)$/);
    if (match) return `${match[1]} × ${match[2]}，位置：X ${match[3]}、Y ${match[4]}`;
    match = key.match(/^Crop (\d+)×(\d+)$/);
    if (match) return `裁剪 ${match[1]}×${match[2]}`;
    match = key.match(/^Scale (\d+)×(\d+)$/);
    if (match) return `缩放至 ${match[1]}×${match[2]}`;
    match = key.match(/^Rotate \/ Flip — (.+)$/);
    if (match) return `旋转 / 翻转 — ${{ '90° CW': '顺时针 90°', '90° CCW': '逆时针 90°', '180°': '180°', 'H-flip': '水平翻转', 'V-flip': '垂直翻转', 'HV-flip': '水平和垂直翻转' }[match[1]] || match[1]}`;
    match = key.match(/^Adjust \(br (.+) · con (.+) · sat (.+)\)$/);
    if (match) return `画面调整（亮度 ${match[1]} · 对比度 ${match[2]} · 饱和度 ${match[3]}）`;
    match = key.match(/^Fade in ([\d.]+)s \/ out ([\d.]+)s$/);
    if (match) return `淡入 ${match[1]} 秒 / 淡出 ${match[2]} 秒`;
    match = key.match(/^Denoise (.+)$/);
    if (match) return `降噪：${match[1]}`;
    match = key.match(/^(Sharpen|Blur) (.+)$/);
    if (match) return `${match[1] === 'Sharpen' ? '锐化' : '模糊'} ${match[2]}`;
    match = key.match(/^Speed ([\d.]+)×$/);
    if (match) return `速度 ${match[1]}×`;
    match = key.match(/^Pad (\d+)×(\d+)$/);
    if (match) return `补边至 ${match[1]}×${match[2]}`;
    match = key.match(/^Volume (\d+)%$/);
    if (match) return `音量 ${match[1]}%`;
    match = key.match(/^(\d+)% smaller$/);
    if (match) return `缩小 ${match[1]}%`;
    match = key.match(/^(\d+)% larger$/);
    if (match) return `增大 ${match[1]}%`;
    match = key.match(/^Process Stack(?:\s*\((\d+)\))?$/);
    if (match) return `处理操作链${match[1] ? `（${match[1]} 项）` : ''}`;
    match = key.match(/^Batch Outputs\s*\((\d+)\)$/);
    if (match) return `批量输出（${match[1]}）`;
    match = key.match(/^Load failed:\s*(.*)$/);
    if (match) return `载入失败：${localizeDetail(match[1])}`;
    match = key.match(/^Load error:\s*(.*)$/);
    if (match) return `载入错误：${localizeDetail(match[1])}`;
    match = key.match(/^Error:\s*(.*)$/);
    if (match) return `错误：${localizeDetail(match[1])}`;
    match = key.match(/^Error processing (.+?):\s*(.*)$/);
    if (match) return `处理文件 ${match[1]} 时出错：${localizeDetail(match[2])}`;
    match = key.match(/^Error (creating ZIP|extracting audio|confirming transcript):\s*(.*)$/);
    if (match) return `错误${({ 'creating ZIP': '创建 ZIP', 'extracting audio': '提取音频', 'confirming transcript': '确认字幕' })[match[1]]}：${localizeDetail(match[2])}`;
    match = key.match(/^Auto-Caption error:\s*(.*)$/);
    if (match) return `自动字幕错误：${localizeDetail(match[1])}`;
    match = key.match(/^Hand-off:\s*(.*)$/);
    if (match) return `任务交接：${localizeDetail(match[1])}`;
    match = key.match(/^Warning: Could not delete (.+?):\s*(.*)$/);
    if (match) return `警告：无法删除 ${match[1]}：${localizeDetail(match[2])}`;
    match = key.match(/^File loaded: (.+) \((.+)\)$/);
    if (match) return `已载入文件：${match[1]}（${match[2]}）`;
    match = key.match(/^Graceful fallback: Added "(.+)" to batch queue\. You can add more files\.$/);
    if (match) return `已将“${match[1]}”加入批量队列。你还可以继续添加文件。`;
    match = key.match(/^Added (\d+) file\(s\) to batch queue\.$/);
    if (match) return `已将 ${match[1]} 个文件加入批量队列。`;
    match = key.match(/^Loaded first batch file for stack building: "(.+)"$/);
    if (match) return `已载入第一个批量文件，用于构建操作链：“${match[1]}”`;
    match = key.match(/^(\d+) files completed\. Download each file individually using the download button\.$/);
    if (match) return `已完成 ${match[1]} 个文件，请使用下载按钮逐个下载。`;
    match = key.match(/^⚠ “(.+)” is not supported in batch mode\. It requires per-file configuration or is a multi-input operation\.$/);
    if (match) return `⚠ “${localize(match[1])}”不支持批量模式；该操作需要逐文件设置或需要多个输入文件。`;
    match = key.match(/^Parsed (\d+) subtitle cues$/);
    if (match) return `已解析 ${match[1]} 条字幕`;
    match = key.match(/^Transcription complete: (\d+) segments$/);
    if (match) return `转录完成：${match[1]} 个片段`;
    match = key.match(/^Starting Auto-Caption with (.+) model…$/);
    if (match) return `正在使用 ${match[1]} 模型生成字幕…`;
    match = key.match(/^Stage (\d+)\/3: (.+?)[…\.]*$/);
    if (match) {
      const stages = { 'Extracting audio': '正在提取音频', 'Transcribing with Whisper': '正在使用 Whisper 转录', 'Ready for review': '已就绪，等待检查' };
      return `阶段 ${match[1]}/3：${stages[match[2]] || localizeDetail(match[2])}…`;
    }
    match = key.match(/^Starting batch processing of (\d+) file\(s\)…$/);
    if (match) return `开始批量处理 ${match[1]} 个文件…`;
    match = key.match(/^Batch complete: (\d+) succeeded, (\d+) failed\.$/);
    if (match) return `批量处理完成：成功 ${match[1]} 个，失败 ${match[2]} 个。`;
    match = key.match(/^Batch stack complete: (\d+) succeeded, (\d+) failed\.$/);
    if (match) return `批量操作链处理完成：成功 ${match[1]} 个，失败 ${match[2]} 个。`;
    match = key.match(/^Starting batch stack \((\d+) ops?\) on (\d+) files?…$/);
    if (match) return `正在对 ${match[2]} 个文件执行包含 ${match[1]} 项操作的批量操作链…`;
    match = key.match(/^Starting batch stack \((\d+) ops?\) on (\d+) file\(s\)…$/);
    if (match) return `正在对 ${match[2]} 个文件执行包含 ${match[1]} 项操作的批量操作链…`;
    match = key.match(/^\[(\d+)\/(\d+)\] Processing: (.+)$/);
    if (match) return `[${match[1]}/${match[2]}] 正在处理：${match[3]}`;
    match = key.match(/^Writing (.+)…$/);
    if (match) return `正在写入 ${match[1]}…`;
    match = key.match(/^Processing (.+)…$/);
    if (match) return `正在处理 ${match[1]}…`;
    match = key.match(/^Extracted ([\d.]+)s of audio \((\d+) samples @ 16 kHz\)$/);
    if (match) return `已提取 ${match[1]} 秒音频（${match[2]} 个采样点，16 kHz）`;
    match = key.match(/^Caption font size: (.+) \((\d+)px @ (\d+)x(\d+)\)$/);
    if (match) return `字幕字号：${match[1]}（${match[2]} 像素，画布 ${match[3]}×${match[4]}）`;
    match = key.match(/^Loading model… (\d+%)$/);
    if (match) return `正在载入模型… ${match[1]}`;
    match = key.match(/^Transcribing… (\d+%)$/);
    if (match) return `正在转录… ${match[1]}`;
    match = key.match(/^(.+) model \(([^)]+)\): (.+)\. Downloads and caches on first use\.$/);
    if (match) {
      const qualities = {
        'Lower quality, very fast': '精度较低，速度很快',
        'Balanced quality & speed (recommended)': '精度与速度均衡（推荐）',
        'Higher quality, slower': '精度较高，速度较慢',
        'Best quality, very slow': '精度最高，速度很慢',
      };
      return `${match[1]} 模型（${match[2]}）：${qualities[match[3]] || match[3]}。首次使用时会下载并缓存。`;
    }
    match = key.match(/^Download output\.([a-z0-9]+)$/i);
    if (match) return `下载输出文件.${match[1]}`;
    match = key.match(/^Downloaded all (\d+) files as ZIP$/);
    if (match) return `已将全部 ${match[1]} 个文件打包下载为 ZIP`;
    match = key.match(/^Crop adjusted for this video \((\d+)×(\d+)\): \((\d+),(\d+) (\d+)×(\d+)\) → \((\d+),(\d+) (\d+)×(\d+)\)$/);
    if (match) return `已针对当前视频（${match[1]}×${match[2]}）调整裁剪范围：(${match[3]},${match[4]} ${match[5]}×${match[6]}) → (${match[7]},${match[8]} ${match[9]}×${match[10]})`;
    match = key.match(/^Using input file: (.+)$/);
    if (match) return `使用输入文件：${match[1]}`;
    match = key.match(/^Restoring input file to ffmpeg filesystem: (.+)…$/);
    if (match) return `正在将输入文件 ${match[1]} 恢复到 FFmpeg 文件系统…`;
    match = key.match(/^DEBUG: Format=(.+), Burn=(.+), SRT length=(\d+)$/);
    if (match) return `调试信息：格式=${match[1]}，烧录字幕=${match[2]}，SRT 长度=${match[3]}`;
    match = key.match(/^“(.+)” is multi-input or whole-file and can’t be chained\. Use Single mode for it\.$/);
    if (match) return `“${localize(match[1])}”需要多个输入文件或处理整个文件，无法加入操作链；请切换到“单项操作”模式。`;
    match = key.match(/^Invalid #cmd — (.+)$/);
    if (match) return `#cmd 命令无效：${localizeDetail(match[1])}`;
    match = key.match(/^Hash command error:\s*(.*)$/);
    if (match) return `哈希命令错误：${localizeDetail(match[1])}`;
    match = key.match(/^Hash command rejected:\s*(.*)$/);
    if (match) return `哈希命令已拒绝：${localizeDetail(match[1])}`;
    match = key.match(/^Hash command: running '(.+)' (.+)…$/);
    if (match) return `正在运行哈希命令“${match[1]}”：${match[2]}…`;
    match = key.match(/^Hash command preloaded: (.+)$/);
    if (match) return `已载入哈希命令：${match[1]}`;
    match = key.match(/^Recipe loaded: (.+?)(?: — add a file to run it)?$/);
    if (match) {
      const parts = match[1].match(/^([\w-]+)(\s+.*)$/);
      const command = parts ? `${operationNames[parts[1]] || parts[1]}${parts[2]}` : match[1];
      return `已载入命令预设：${command}${key.endsWith(' — add a file to run it') ? ' — 添加文件后即可运行' : ''}`;
    }
    match = key.match(/^ffmpeg exited with code (\d+) — check your arguments and try again\.$/i);
    if (match) return `FFmpeg 退出码为 ${match[1]}，请检查参数后重试。`;
    match = key.match(/^ffmpeg exited with code (\d+)\. Check FFmpeg log above for details\.$/i);
    if (match) return `FFmpeg 退出码为 ${match[1]}，请查看上方 FFmpeg 日志了解详情。`;
    match = key.match(/^ffmpeg exited with code (\d+): (.+)$/i);
    if (match) return `FFmpeg 退出码为 ${match[1]}：${localizeDetail(match[2])}`;
    match = key.match(/^ffmpeg exited with code (\d+)$/i);
    if (match) return `FFmpeg 退出码为 ${match[1]}`;
    match = key.match(/^FFmpeg error:\s*(.*)$/i);
    if (match) return `FFmpeg 错误：${localizeDetail(match[1])}`;
    match = key.match(/^ffmpeg audio extraction failed with exit code (\d+)$/i);
    if (match) return `FFmpeg 提取音频失败，退出码为 ${match[1]}`;
    match = key.match(/^Subtitle file not found in ffmpeg filesystem:\s*(.*)$/i);
    if (match) return `在 FFmpeg 文件系统中找不到字幕文件：${localizeDetail(match[1])}`;
    match = key.match(/^Failed to load ffmpeg\.wasm:\s*(.*)$/i);
    if (match) return `载入 ffmpeg.wasm 失败：${localizeDetail(match[1])}`;
    match = key.match(/^Failed to write subtitle file:\s*(.*)$/i);
    if (match) return `写入字幕文件失败：${localizeDetail(match[1])}`;
    match = key.match(/^Failed to restore input file to ffmpeg:\s*(.*)$/i);
    if (match) return `恢复输入文件到 FFmpeg 失败：${localizeDetail(match[1])}`;
    match = key.match(/^Invalid WAV data: file size (\d+)$/i);
    if (match) return `WAV 数据无效：文件大小为 ${match[1]} 字节`;
    match = key.match(/^Invalid format: (.+)$/i);
    if (match) return `格式无效：${match[1]}`;
    match = key.match(/^trim\.args\.end \((.+)\) must be greater than trim\.args\.start \((.+)\)$/i);
    if (match) return `trim.args.end（${match[1]}）必须大于 trim.args.start（${match[2]}）`;
    match = key.match(/^unsupported op '(.+)'$/i);
    if (match) return `不支持的操作“${match[1]}”`;
    match = key.match(/^The job needs a file named '(.+)'\.$/);
    if (match) return `任务需要一个名为“${match[1]}”的文件。`;
    match = key.match(/^The job needs '(.+)' or '(.+)' to add to the video\.$/);
    if (match) return `需要提供“${match[1]}”或“${match[2]}”，才能添加到视频中。`;
    match = key.match(/^'(.+)' is empty\.$/);
    if (match) return `“${match[1]}”为空。`;
    match = key.match(/^'(.+)' must be an ArrayBuffer\.$/);
    if (match) return `“${match[1]}”必须是 ArrayBuffer。`;
    match = key.match(/^The files total ([\d.]+) MB; this tool takes at most ([\d.]+) MB per job because ffmpeg\.wasm works in a 2 GB in-browser memory\.$/);
    if (match) return `文件总计 ${match[1]} MB；每个任务最多支持 ${match[2]} MB，因为 ffmpeg.wasm 在浏览器中使用约 2 GB 内存。`;
    match = key.match(/^Timed out loading ffmpeg\.wasm\.$/i);
    if (match) return '载入 ffmpeg.wasm 超时。';
    match = key.match(/^ffmpeg\.wasm could not be loaded: (.+)$/i);
    if (match) return `无法载入 ffmpeg.wasm：${localizeDetail(match[1])}`;
    match = key.match(/^ffmpeg\.wasm stopped: (.+)$/i);
    if (match) return `ffmpeg.wasm 已停止：${localizeDetail(match[1])}`;
    match = key.match(/^ffmpeg subtitle embedding failed with code (\d+)\. Check FFmpeg log above for details\.$/i);
    if (match) return `FFmpeg 嵌入字幕失败，退出码为 ${match[1]}；请查看上方 FFmpeg 日志了解详情。`;
    match = key.match(/^Mux failed: (.+)$/i);
    if (match) return `封装失败：${localizeDetail(match[1])}`;
    match = key.match(/^Unknown op '(.+)'\. This tool does: (.+)\.$/);
    if (match) return `未知操作“${match[1]}”。此工具支持：${match[2]}。`;
    match = key.match(/^ffmpeg\.wasm could not be started \(is cdn\.jsdelivr\.net blocked\?\)\.$/i);
    if (match) return '无法启动 ffmpeg.wasm（cdn.jsdelivr.net 是否被拦截？）';
    match = key.match(/^The tool is already running another job\.$/i);
    if (match) return '此工具正在处理另一个任务。';
    match = key.match(/^unknown top-level field '(.+)'$/);
    if (match) return `未知的顶层字段“${match[1]}”`;
    match = key.match(/^unknown op (.+) — must be one of (.+)$/);
    if (match) return `未知操作 ${match[1]}；可用操作为：${match[2]}`;
    match = key.match(/^op '(.+)' requires an 'args' object$/);
    if (match) return `操作“${match[1]}”需要一个 args 对象`;
    match = key.match(/^unknown arg '(.+)' for op '(.+)'$/);
    if (match) return `操作“${match[2]}”不支持参数“${match[1]}”`;
    match = key.match(/^([\w.-]+)\.args\.([\w.-]+) is required$/);
    if (match) return `缺少必填参数：${match[1]}.args.${match[2]}`;
    match = key.match(/^([\w.-]+)\.args\.([\w.-]+) must be an integer \(got (.+)\)$/);
    if (match) return `${match[1]}.args.${match[2]} 必须为整数（当前值：${match[3]}）`;
    match = key.match(/^([\w.-]+)\.args\.([\w.-]+) must be a number \(got (.+)\)$/);
    if (match) return `${match[1]}.args.${match[2]} 必须为数字（当前值：${match[3]}）`;
    match = key.match(/^([\w.-]+)\.args\.([\w.-]+) must be one of (.+) \(got (.+)\)$/);
    if (match) return `${match[1]}.args.${match[2]} 必须为以下值之一：${match[3]}（当前值：${match[4]}）`;
    match = key.match(/^([\w.-]+)\.args\.([\w.-]+) (.+) out of range \((min|max) (.+)\)$/);
    if (match) return `${match[1]}.args.${match[2]} 的值 ${match[3]} 超出范围（${match[4] === 'min' ? '最小值' : '最大值'}：${match[5]}）`;
    match = key.match(/^'run' must be a boolean$/);
    if (match) return '“run”必须是布尔值';
    match = key.match(/^command must be a JSON object$/);
    if (match) return '命令必须是 JSON 对象';
    match = key.match(/^malformed JSON in #cmd — (.+)$/);
    if (match) return `#cmd 中的 JSON 格式错误：${localizeDetail(match[1])}`;
    match = key.match(/^failed to fetch$/i);
    if (match) return '网络请求失败，请检查网络连接。';
    match = key.match(/^Warning: Could not preload ffmpeg\. It will attempt to load when you click Confirm & Embed\.$/);
    if (match) return '警告：无法预载 FFmpeg；点击“确认并嵌入”时会再次尝试载入。';
    const diagnostic = localizeDetail(key);
    return diagnostic !== key ? diagnostic : source;
  }

  function localizeDetail(detail) {
    const key = detail.trim();
    const common = {
      'Failed to fetch': '网络请求失败，请检查网络连接。',
      'ffmpeg not loaded': 'FFmpeg 尚未载入',
      'NetworkError when attempting to fetch resource.': '网络请求失败，请检查网络连接。',
      'The operation was aborted.': '操作已中止。',
      'The request timed out.': '请求超时。',
      'The user aborted a request.': '用户已取消请求。',
      'Timed out loading ffmpeg.wasm.': '载入 ffmpeg.wasm 超时。',
      'ffmpeg produced no usable output.': 'FFmpeg 未生成可用的输出文件。',
      'Cancelled.': '已取消。',
      'Invalid argument': '参数无效',
      'No such file or directory': '找不到文件或目录',
      'Permission denied': '权限不足',
      'Conversion failed!': '转换失败！',
      'Out of memory': '内存不足',
    };
    if (common[key]) return common[key];
    let match = key.match(/^ffmpeg exited with code (\d+) — check your arguments and try again\.$/i);
    if (match) return `FFmpeg 退出码为 ${match[1]}，请检查参数后重试。`;
    match = key.match(/^ffmpeg exited with code (\d+)\. Check FFmpeg log above for details\.$/i);
    if (match) return `FFmpeg 退出码为 ${match[1]}，请查看上方 FFmpeg 日志了解详情。`;
    match = key.match(/^ffmpeg exited with code (\d+)(?::\s*(.*))?$/i);
    if (match) return `FFmpeg 退出码为 ${match[1]}${match[2] ? `：${localizeDiagnosticText(match[2])}` : ''}`;
    let prefix = key.match(/^createFFmpegCore not found in\s+(.+)$/i);
    if (prefix) return `未在以下地址找到 createFFmpegCore：${prefix[1]}`;
    prefix = key.match(/^(WASM fetch failed|FFmpeg resource fetch failed|Unknown message type|Failed to fetch extracted frame for JPEG conversion):\s*(.*)$/i);
    if (prefix) {
      const names = {
        'WASM fetch failed': 'WASM 获取失败', 'FFmpeg resource fetch failed': 'FFmpeg 资源获取失败',
        'Unknown message type': '未知消息类型',
        'Failed to fetch extracted frame for JPEG conversion': '获取提取的画面以转换为 JPEG 失败',
      };
      return `${names[prefix[1]] || prefix[1]}：${prefix[2]}`;
    }
    match = key.match(/^([\w.-]+)\.args\.([\w.-]+) is required$/);
    if (match) return `缺少必填参数：${match[1]}.args.${match[2]}`;
    match = key.match(/^([\w.-]+)\.args\.([\w.-]+) must be an integer \(got (.+)\)$/);
    if (match) return `${match[1]}.args.${match[2]} 必须为整数（当前值：${match[3]}）`;
    match = key.match(/^([\w.-]+)\.args\.([\w.-]+) must be a number \(got (.+)\)$/);
    if (match) return `${match[1]}.args.${match[2]} 必须为数字（当前值：${match[3]}）`;
    match = key.match(/^([\w.-]+)\.args\.([\w.-]+) must be one of (.+) \(got (.+)\)$/);
    if (match) return `${match[1]}.args.${match[2]} 必须为以下值之一：${match[3]}（当前值：${match[4]}）`;
    match = key.match(/^([\w.-]+)\.args\.([\w.-]+) (.+) out of range \((min|max) (.+)\)$/);
    if (match) return `${match[1]}.args.${match[2]} 的值 ${match[3]} 超出范围（${match[4] === 'min' ? '最小值' : '最大值'}：${match[5]}）`;
    match = key.match(/^unknown top-level field '(.+)'$/);
    if (match) return `未知的顶层字段“${match[1]}”`;
    match = key.match(/^unknown op (.+) — must be one of (.+)$/);
    if (match) return `未知操作 ${match[1]}；可用操作为：${match[2]}`;
    match = key.match(/^op '(.+)' requires an 'args' object$/);
    if (match) return `操作“${match[1]}”需要一个 args 对象`;
    match = key.match(/^unknown arg '(.+)' for op '(.+)'$/);
    if (match) return `操作“${match[2]}”不支持参数“${match[1]}”`;
    match = key.match(/^'run' must be a boolean$/);
    if (match) return '“run”必须是布尔值';
    match = key.match(/^command must be a JSON object$/);
    if (match) return '命令必须是 JSON 对象';
    match = key.match(/^trim\.args\.end \((.+)\) must be greater than trim\.args\.start \((.+)\)$/i);
    if (match) return `trim.args.end（${match[1]}）必须大于 trim.args.start（${match[2]}）`;
    match = key.match(/^unsupported op '(.+)'$/i);
    if (match) return `不支持的操作“${match[1]}”`;
    match = key.match(/^Invalid data found when processing input$/i);
    if (match) return '处理输入文件时发现无效数据';
    match = key.match(/^Error opening (input|output) file:?\s*(.*)$/i);
    if (match) return `打开${match[1] === 'input' ? '输入' : '输出'}文件时出错：${match[2]}`;
    return localizeDiagnosticText(detail);
  }

  function localizeDiagnosticText(detail) {
    return detail
      .replace(/No such file or directory/gi, '找不到文件或目录')
      .replace(/Invalid data found when processing input/gi, '处理输入文件时发现无效数据')
      .replace(/Error opening input file/gi, '打开输入文件时出错')
      .replace(/Error opening output file/gi, '打开输出文件时出错')
      .replace(/Invalid argument/gi, '参数无效')
      .replace(/Permission denied/gi, '权限不足')
      .replace(/Conversion failed!/gi, '转换失败！')
      .replace(/Out of memory/gi, '内存不足')
      .replace(/memory access out of bounds/gi, '内存访问越界')
      .replace(/Failed to fetch/gi, '网络请求失败')
      .replace(/could not download the Whisper model/gi, '无法下载 Whisper 模型')
      .replace(/Check your network connection and try again/gi, '请检查网络连接后重试');
  }

  function renderTextNode(node) {
    const current = node.nodeValue;
    let source = textSources.get(node);
    const rendered = textRendered.get(node);
    if (source === undefined || (rendered !== undefined && current !== rendered)) {
      source = current;
      textSources.set(node, source);
    }
    const next = localize(source);
    textRendered.set(node, next);
    if (current !== next) node.nodeValue = next;
  }

  function renderAttributes(element) {
    if (['SCRIPT', 'STYLE', 'TEXTAREA'].includes(element.tagName)) return;
    const sourceMap = attrSources.get(element) || new Map();
    const renderedMap = attrRendered.get(element) || new Map();
    for (const name of ['placeholder', 'title', 'aria-label', 'alt']) {
      if (!element.hasAttribute(name)) continue;
      const current = element.getAttribute(name);
      let source = sourceMap.get(name);
      if (source === undefined || (renderedMap.has(name) && current !== renderedMap.get(name))) {
        source = current;
        sourceMap.set(name, source);
      }
      const next = localize(source);
      renderedMap.set(name, next);
      if (current !== next) element.setAttribute(name, next);
    }
    attrSources.set(element, sourceMap);
    attrRendered.set(element, renderedMap);
  }

  function translateTree(root) {
    if (!root) return;
    if (root.nodeType === Node.TEXT_NODE) {
      const parent = root.parentElement;
      if (parent && !['SCRIPT', 'STYLE', 'TEXTAREA', 'CODE', 'PRE'].includes(parent.tagName)) renderTextNode(root);
      return;
    }
    if (root.nodeType !== Node.ELEMENT_NODE && root !== document) return;
    const element = root.nodeType === Node.ELEMENT_NODE ? root : document.documentElement;
    renderAttributes(element);
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        return parent && !['SCRIPT', 'STYLE', 'TEXTAREA', 'CODE', 'PRE'].includes(parent.tagName)
          ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      },
    });
    let node;
    while ((node = walker.nextNode())) renderTextNode(node);
    element.querySelectorAll?.('*').forEach(renderAttributes);
  }

  function applyPreferences() {
    const language = resolveLanguage();
    document.documentElement.lang = language;
    document.documentElement.dataset.theme = resolveTheme();
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.content = document.documentElement.dataset.theme === 'light' ? '#f3f6fc' : '#0a1020';
    const description = document.querySelector('meta[name="description"]');
    if (description) description.content = language === 'zh-CN'
      ? '基于 ffmpeg.wasm 的本地视频编辑器。所有处理均在浏览器中完成，文件不会上传。'
      : 'A browser-based video editor powered by ffmpeg.wasm. All processing happens locally in your browser.';
    const manifest = document.querySelector('link[rel="manifest"]');
    const manifestPath = language === 'zh-CN' ? './manifest.zh-CN.json' : './manifest.json';
    if (manifest && !manifest.href.endsWith(manifestPath.slice(2))) manifest.href = manifestPath;
    const languageSelect = document.getElementById('languageSelect');
    const themeSelect = document.getElementById('themeSelect');
    if (languageSelect) languageSelect.value = languageMode;
    if (themeSelect) themeSelect.value = themeMode;
    translateTree(document);
    filterOperations();
  }

  function filterOperations() {
    const search = document.getElementById('opSearch');
    const category = document.getElementById('opCategory');
    if (!search || !category) return;
    const query = search.value.trim().toLocaleLowerCase();
    for (const tile of document.querySelectorAll('.op-tile')) {
      const id = tile.id.replace(/^op-/, '');
      const label = operationNames[id] || '';
      const haystack = `${id} ${label} ${tile.textContent}`.toLocaleLowerCase();
      const categoryMatch = category.value === 'all' || operationCategories[id] === category.value;
      tile.classList.toggle('hidden', !categoryMatch || (!!query && !haystack.includes(query)));
    }
  }

  function init() {
    const languageSelect = document.getElementById('languageSelect');
    const themeSelect = document.getElementById('themeSelect');
    languageMode = ['auto', 'zh-CN', 'en'].includes(languageMode) ? languageMode : 'auto';
    themeMode = ['auto', 'light', 'dark'].includes(themeMode) ? themeMode : 'auto';
    if (languageSelect) languageSelect.addEventListener('change', () => {
      languageMode = languageSelect.value;
      safeSet(STORAGE.language, languageMode);
      applyPreferences();
    });
    if (themeSelect) themeSelect.addEventListener('change', () => {
      themeMode = themeSelect.value;
      safeSet(STORAGE.theme, themeMode);
      applyPreferences();
    });
    document.getElementById('opSearch')?.addEventListener('input', filterOperations);
    document.getElementById('opCategory')?.addEventListener('change', filterOperations);
    window.matchMedia?.('(prefers-color-scheme: light)').addEventListener?.('change', () => {
      if (themeMode === 'auto') applyPreferences();
    });

    applyPreferences();
    observer = new MutationObserver(records => {
      for (const record of records) {
        if (record.type === 'characterData') translateTree(record.target);
        else if (record.type === 'attributes') translateTree(record.target);
        else record.addedNodes.forEach(node => translateTree(node));
      }
    });
    observer.observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ['placeholder', 'title', 'aria-label', 'alt'] });
  }

  window.ffmpegWebCliI18n = { localize, applyPreferences, operationNames };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
