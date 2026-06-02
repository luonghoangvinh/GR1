import { Deck, Flashcard } from '../types';

const DECKS_STORAGE_KEY = 'jlpt_decks';

// Get all decks
export function getDecks(): Deck[] {
  const stored = localStorage.getItem(DECKS_STORAGE_KEY);
  if (!stored) return [];
  try {
    const decks = JSON.parse(stored);
    // Convert createdAt strings back to Date objects
    return decks.map((deck: any) => ({
      ...deck,
      createdAt: new Date(deck.createdAt)
    }));
  } catch {
    return [];
  }
}

// Get deck by ID
export function getDeckById(id: string): Deck | null {
  const decks = getDecks();
  return decks.find(deck => deck.id === id) || null;
}

// Save all decks
function saveDecks(decks: Deck[]) {
  localStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks));
}

// Create new deck
export function createDeck(name: string, description: string, color?: string, icon?: string, visibility?: 'personal' | 'community'): Deck {
  const decks = getDecks();
  const newDeck: Deck = {
    id: `deck-${Date.now()}`,
    name,
    description,
    cardCount: 0,
    cards: [],
    createdAt: new Date(),
    color: color || '#3B82F6',
    icon: icon || '📚',
    visibility: visibility || 'personal'
  };
  decks.push(newDeck);
  saveDecks(decks);
  return newDeck;
}

// Update deck
export function updateDeck(id: string, updates: Partial<Deck>): boolean {
  const decks = getDecks();
  const index = decks.findIndex(deck => deck.id === id);
  if (index === -1) return false;
  
  decks[index] = {
    ...decks[index],
    ...updates,
    id: decks[index].id, // Preserve ID
    createdAt: decks[index].createdAt // Preserve creation date
  };
  saveDecks(decks);
  return true;
}

// Delete deck
export function deleteDeck(id: string): boolean {
  const decks = getDecks();
  const filtered = decks.filter(deck => deck.id !== id);
  if (filtered.length === decks.length) return false;
  saveDecks(filtered);
  return true;
}

// Duplicate deck
export function duplicateDeck(id: string): Deck | null {
  const deck = getDeckById(id);
  if (!deck) return null;
  
  const newDeck: Deck = {
    ...deck,
    id: `deck-${Date.now()}`,
    name: `${deck.name} (Copy)`,
    createdAt: new Date(),
    cards: deck.cards.map(card => ({
      ...card,
      id: `card-${Date.now()}-${Math.random()}`
    }))
  };
  
  const decks = getDecks();
  decks.push(newDeck);
  saveDecks(decks);
  return newDeck;
}

// Add card to deck
export function addCardToDeck(deckId: string, card: Omit<Flashcard, 'id'>): boolean {
  const decks = getDecks();
  const deckIndex = decks.findIndex(d => d.id === deckId);
  if (deckIndex === -1) return false;
  
  const newCard: Flashcard = {
    ...card,
    id: `card-${Date.now()}-${Math.random()}`,
    status: 'new'
  };
  
  decks[deckIndex].cards.push(newCard);
  decks[deckIndex].cardCount = decks[deckIndex].cards.length;
  saveDecks(decks);
  return true;
}

// Update card in deck
export function updateCard(deckId: string, cardId: string, updates: Partial<Flashcard>): boolean {
  const decks = getDecks();
  const deckIndex = decks.findIndex(d => d.id === deckId);
  if (deckIndex === -1) return false;
  
  const cardIndex = decks[deckIndex].cards.findIndex(c => c.id === cardId);
  if (cardIndex === -1) return false;
  
  decks[deckIndex].cards[cardIndex] = {
    ...decks[deckIndex].cards[cardIndex],
    ...updates,
    id: cardId // Preserve ID
  };
  
  saveDecks(decks);
  return true;
}

// Delete card from deck
export function deleteCard(deckId: string, cardId: string): boolean {
  const decks = getDecks();
  const deckIndex = decks.findIndex(d => d.id === deckId);
  if (deckIndex === -1) return false;
  
  const originalLength = decks[deckIndex].cards.length;
  decks[deckIndex].cards = decks[deckIndex].cards.filter(c => c.id !== cardId);
  
  if (decks[deckIndex].cards.length === originalLength) return false;
  
  decks[deckIndex].cardCount = decks[deckIndex].cards.length;
  saveDecks(decks);
  return true;
}

// Duplicate card
export function duplicateCard(deckId: string, cardId: string): boolean {
  const deck = getDeckById(deckId);
  if (!deck) return false;
  
  const card = deck.cards.find(c => c.id === cardId);
  if (!card) return false;
  
  const newCard: Flashcard = {
    ...card,
    id: `card-${Date.now()}-${Math.random()}`,
    status: 'new'
  };
  
  return addCardToDeck(deckId, newCard);
}

// Export deck to JSON
export function exportDeck(id: string): string | null {
  const deck = getDeckById(id);
  if (!deck) return null;
  return JSON.stringify(deck, null, 2);
}

// Import deck from JSON
export function importDeck(jsonString: string): Deck | null {
  try {
    const deck = JSON.parse(jsonString) as Deck;
    deck.id = `deck-${Date.now()}`;
    deck.createdAt = new Date();
    
    const decks = getDecks();
    decks.push(deck);
    saveDecks(decks);
    return deck;
  } catch {
    return null;
  }
}