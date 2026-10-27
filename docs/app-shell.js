(() => {
  'use strict';

  const STORAGE = { language: 'ffmpeg-webcli-language', theme: 'ffmpeg-webcli-theme' };
  const translations = {
    'Auto': '自动', 'Light': '浅色', 'Dark': '深色', 'Language': '语言', 'Theme': '主题',
    'Display preferences': '显示设置', 'offline-first': '离线优先',
    'Processing mode': '处理模式', 'Operation category': '操作分类', 'Crop selection': '裁剪区域',
    'Process multiple files': '处理多个文件', 'Download all as ZIP': '全部打包下载',
    '100% local. Data never leaves your browser.': '100% 本地处理，文件不会离开浏览器。',
    'Fork on GitHub': '在 GitHub 上查看', 'Input Video': '输入视频', 'Operations': '操作',
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
    match = key.match(/^Process Stack(?:\s*\((\d+)\))?$/);
    if (match) return `处理操作链${match[1] ? `（${match[1]} 项）` : ''}`;
    match = key.match(/^Batch Outputs\s*\((\d+)\)$/);
    if (match) return `批量输出（${match[1]}）`;
    match = key.match(/^Load failed:\s*(.*)$/);
    if (match) return `载入失败：${match[1]}`;
    return source;
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
    for (const name of ['placeholder', 'title', 'aria-label']) {
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
    observer.observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ['placeholder', 'title', 'aria-label'] });
  }

  window.ffmpegWebCliI18n = { localize, applyPreferences, operationNames };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
