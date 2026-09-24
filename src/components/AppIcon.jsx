import React from 'react';
import {
  Accessibility, Activity, AlertCircle, AlertTriangle, Apple, ArrowDown, ArrowLeft, ArrowRight,
  ArrowRightLeft, ArrowUpRight, Award, BarChart2, BookOpen, Bot, Box, Briefcase,
  Building, Building2, Calendar, CalendarDays, Car, Check, CheckCircle, ChevronDown,
  ChevronLeft, ChevronRight, Clock, Cloud, Code, Coffee, Compass, Copyright,
  Cpu, CreditCard, Database, DollarSign, Download, Edit, ExternalLink, Eye,
  Facebook, FileCheck2, FileText, Fingerprint, Flag, FlaskConical, FolderOpen, GitBranch,
  Github, Globe, GraduationCap, Grid, Handshake, HardDrive, Heart, HelpCircle, Home,
  Info, Key, Languages, Laptop, Layers, Leaf, Lightbulb, Linkedin,
  Lock, Mail, MapPin, MessageCircle, MessageSquare, Mic, Microscope, Monitor,
  MoreHorizontal, Navigation, Network, Newspaper, Package, Palette, PartyPopper, Phone,
  Plane, Play, Plus, Quote, Rocket, RotateCcw, Satellite, Search, ShieldAlert,
  SearchX, Send, Server, Settings, Shield, ShieldCheck, Smartphone, Smile,
  Sparkles, Star, Target, ThumbsUp, TrendingUp, Trophy, Twitter, Upload,
  User, UserCheck, Users, Video, Wifi, X, XCircle, Zap,
} from 'lucide-react';

// Imports nommés explicites plutôt que "import * as LucideIcons" : un import
// namespace force Rollup à embarquer les ~1500 icônes de lucide-react dans le
// bundle (aucune analyse statique possible sur l'accès dynamique
// ICONS[name]), soit ~800 Ko rien que pour cette bibliothèque. Avec des
// imports nommés, seules les icônes réellement utilisées dans le code (+ les
// options des sélecteurs d'icônes de l'admin) sont embarquées.
//
// Cette liste doit rester synchronisée avec les noms d'icônes utilisés dans
// le code (props "name"/"icon"/"iconName" et listes ICON_OPTIONS de
// l'admin). Un nom absent de la liste retombe sur HelpCircle ci-dessous —
// aucune casse, juste une icône générique à la place de l'icône prévue.
const ICONS = {
  Accessibility, Activity, AlertCircle, AlertTriangle, Apple, ArrowDown, ArrowLeft, ArrowRight,
  ArrowRightLeft, ArrowUpRight, Award, BarChart2, BookOpen, Bot, Box, Briefcase,
  Building, Building2, Calendar, CalendarDays, Car, Check, CheckCircle, ChevronDown,
  ChevronLeft, ChevronRight, Clock, Cloud, Code, Coffee, Compass, Copyright,
  Cpu, CreditCard, Database, DollarSign, Download, Edit, ExternalLink, Eye,
  Facebook, FileCheck2, FileText, Fingerprint, Flag, FlaskConical, FolderOpen, GitBranch,
  Github, Globe, GraduationCap, Grid, Handshake, HardDrive, Heart, Home,
  Info, Key, Languages, Laptop, Layers, Leaf, Lightbulb, Linkedin,
  Lock, Mail, MapPin, MessageCircle, MessageSquare, Mic, Microscope, Monitor,
  MoreHorizontal, Navigation, Network, Newspaper, Package, Palette, PartyPopper, Phone,
  Plane, Play, Plus, Quote, Rocket, RotateCcw, Satellite, Search, ShieldAlert,
  SearchX, Send, Server, Settings, Shield, ShieldCheck, Smartphone, Smile,
  Sparkles, Star, Target, ThumbsUp, TrendingUp, Trophy, Twitter, Upload,
  User, UserCheck, Users, Video, Wifi, X, XCircle, Zap,
};

function Icon({
    name,
    size = 24,
    color = "currentColor",
    className = "",
    strokeWidth = 2,
    ...props
}) {
    const IconComponent = ICONS?.[name];

    if (!IconComponent) {
        return <HelpCircle size={size} color="gray" strokeWidth={strokeWidth} className={className} {...props} />;
    }

    return <IconComponent
        size={size}
        color={color}
        strokeWidth={strokeWidth}
        className={className}
        {...props}
    />;
}
export default Icon;
