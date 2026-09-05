import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';

export default function VoteCard({
  avatarLabel, username, time, question,
  optionA, optionB, percentA, percentB, votes, comments,
}) {
  return (
    <View style={styles.card}>
      <View style={styles.who}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{avatarLabel}</Text>
        </View>
        <View>
          <Text style={styles.uname}>{username}</Text>
          <Text style={styles.time}>{time}</Text>
        </View>
      </View>

      <Text style={styles.question}>{question}</Text>

      <View style={styles.opts}>
        <TouchableOpacity style={[styles.opt, { backgroundColor: colors.peachFuzz }]} activeOpacity={0.85}>
          <View style={styles.letter}><Text style={styles.letterText}>A</Text></View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{optionA}</Text>
            <Text style={styles.tagText}>{percentA}%</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.opt, { backgroundColor: colors.periwinkle }]} activeOpacity={0.85}>
          <View style={styles.letter}><Text style={styles.letterText}>B</Text></View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{optionB}</Text>
            <Text style={styles.tagText}>{percentB}%</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.resultbar}>
        <View style={{ flex: percentA, backgroundColor: colors.peachFuzz }} />
        <View style={{ flex: percentB, backgroundColor: colors.softPeriwinkle }} />
      </View>

      <View style={styles.meta}>
        <Text style={styles.metaMono}>{votes} votos</Text>
        <View style={styles.metaIconRow}>
          <Ionicons name="chatbubble-ellipses-outline" size={14} color={colors.inkSoft} />
          <Text style={styles.metaText}>{comments}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 26, // --r-lg
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.line,
  },
  who: { flexDirection: 'row', alignItems: 'center', gap: 9, marginBottom: 10 },
  avatar: {
    width: 30, height: 30, borderRadius: 15,
    backgroundColor: colors.periwinkle,
    alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { fontFamily: fonts.display, fontSize: 12, color: colors.white },
  uname: { fontFamily: fonts.bodyBold, fontSize: 13.5, color: colors.ink },
  time: { fontFamily: fonts.body, fontSize: 11.5, color: colors.inkSoft },
  question: { fontFamily: fonts.displaySemibold, fontSize: 16, marginBottom: 12, color: colors.ink, lineHeight: 21 },
  opts: { flexDirection: 'row', gap: 8 },
  opt: {
    flex: 1, height: 120, borderRadius: 16, // --r-md
    justifyContent: 'flex-end', overflow: 'hidden',
  },
  letter: {
    position: 'absolute', top: 8, left: 8,
    width: 22, height: 22, borderRadius: 7,
    backgroundColor: 'rgba(255,255,255,0.85)',
    alignItems: 'center', justifyContent: 'center',
  },
  letterText: { fontFamily: fonts.display, fontSize: 12, color: colors.ink },
  tag: {
    padding: 8,
    backgroundColor: 'rgba(56,47,85,0.16)',
    flexDirection: 'row', justifyContent: 'space-between',
  },
  tagText: { color: colors.white, fontFamily: fonts.bodyBold, fontSize: 12.5 },
  resultbar: {
    height: 8, borderRadius: 100, overflow: 'hidden',
    flexDirection: 'row', marginTop: 12, backgroundColor: colors.line,
  },
  meta: {
    flexDirection: 'row', justifyContent: 'space-between',
    marginTop: 12,
  },
  metaMono: { fontFamily: fonts.mono, fontSize: 12, color: colors.inkSoft },
  metaIconRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  metaText: { fontFamily: fonts.bodyBold, fontSize: 12, color: colors.inkSoft },
});
