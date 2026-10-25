require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder, REST, Routes, SlashCommandBuilder } = require('discord.js');
const 【entity-axios¦canonical_name=axios】 = require('【entity-axios¦canonical_name=axios】');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const commands = [
  new SlashCommandBuilder().setName('حالة').setDescription('يشيك حالة دلتا وباقي التنفيذات'),
  new SlashCommandBuilder().setName('تثبيت_دلتا').setDescription('شرح تثبيت دلتا بالعراقي'),
  new SlashCommandBuilder().setName('مفتاح').setDescription('حل مشكلة مفتاح دلتا'),
  new SlashCommandBuilder().setName('مساعدة').setDescription('كل اوامر البوت'),
  new SlashCommandBuilder().setName('قوانين').setDescription('قوانين سيرفر السكربتات'),
  new SlashCommandBuilder().setName('سكربت').setDescription('جيب سكربت من ScriptBlox').addStringOption(opt => opt.setName('اسم_اللعبة').setDescription('مثلا Blox Fruits').setRequired(true))
].map(c => c.toJSON());
const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
(async () => {
  try {
    if (process.env.GUILD_ID) {
      await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: commands });
    } else {
      await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });
    }
  } catch (e) { console.error(e); }
})();
client.on('ready', () => {
  console.log(`✅ البوت شغال باسم ${client.user.tag}`);
  client.user.setActivity('دلتا العراق | /مساعدة');
});
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;
  await interaction.deferReply();
  if (interaction.commandName === 'حالة') {
    const embed = new EmbedBuilder().setColor(0x00FF00).setTitle('📡 حالة التنفيذات اليوم').setDescription('بتوقيت بغداد').addFields({ name: '🟢 Delta', value: 'شغال - v2.672', inline: true },{ name: '🟢 Codex', value: 'شغال', inline: true },{ name: '🟡 Fluxus', value: 'بيه لاك خفيف', inline: true }).setFooter({ text: 'Delta Iraq Hub - البصرة 🇮🇶' }).setTimestamp();
    await interaction.editReply({ embeds: [embed] });
  }
  if (interaction.commandName === 'تثبيت_دلتا') {
    await interaction.editReply({ embeds: [new EmbedBuilder().setColor(0x0099FF).setTitle('📥 تثبيت دلتا').setDescription('اندرويد: امسح روبلوكس القديم -> نزل من deltaexploits.gg -> ثبت APK\nPC: طفي الانتي فايروس -> نزل من الموقع -> شغله admin')] });
  }
  if (interaction.commandName === 'مفتاح') {
    await interaction.editReply({ embeds: [new EmbedBuilder().setColor(0xFFAA00).setTitle('🔑 حل المفتاح').setDescription('لا تدوس Skip بسرعة - انتظر 5 ثواني - كمل الخطوات')] });
  }
  if (interaction.commandName === 'مساعدة') {
    await interaction.editReply({ embeds: [new EmbedBuilder().setColor(0xFFFFFF).setTitle('🇮🇶 الاوامر').setDescription('/حالة - /تثبيت_دلتا - /مفتاح - /سكربت Blox Fruits - /قوانين')] });
  }
  if (interaction.commandName === 'قوانين') {
    await interaction.editReply({ embeds: [new EmbedBuilder().setColor(0xFF0000).setTitle('📜 قوانين').setDescription('1. ممنوع سكربتات تسرق حسابات\n2. ممنوع روابط مفيرسة\n3. ممنوع بيع مسربات')] });
  }
  if (interaction.commandName === 'سكربت') {
    const query = interaction.options.getString('اسم_اللعبة');
    try {
      const res = await axios.get(`https://scriptblox.com/api/script/search?q=${encodeURIComponent(query)}&mode=free`);
      const scripts = res.data.result?.scripts || [];
      if (!scripts.length) { await interaction.editReply(`❌ ما لكيت لـ ${query}`); return; }
      const top3 = scripts.slice(0, 3);
      const embeds = top3.map(s => new EmbedBuilder().setColor(0x8A2BE2).setTitle(`📜 ${s.title}`).setDescription(`**${s.game?.name||query}** - 👁️ ${s.views||0}\n\`\`\`lua\n${s.script.substring(0,900)}\n\`\`\``).setFooter({text:`scriptblox.com`}));
      await interaction.editReply({ content:`✅ ${scripts.length} سكربت لـ ${query}:`, embeds });
    } catch { await interaction.editReply('❌ خطأ بـ ScriptBlox'); }
  }
});
client.login(process.env.DISCORD_TOKEN);