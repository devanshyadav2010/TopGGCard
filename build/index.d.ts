export declare class TopGGCard {
  constructor(options?: {
    name?: string;
    color?: string;
    avatar?: string;
    votes?: string;
    streak?: string;
    brightness?: number;
    progress?: number;
    currentStreak?: string;
    requiredStreak?: string;
    showStreak?: boolean;
  });

  public setName(name: string): this;
  public setColor(color: string): this;
  public setAvatar(avatar: string): this;
  public setVotes(votes: number): this;
  public setStreak(streak: number): this;
  public setBrightness(brightness: number): this;
  public setProgress(progress: number): this;
  public setCurrentStreak(currentStreak: number): this;
  public setRequiredStreak(requiredStreak: number): this;
  public setShowStreak(showStreak: boolean): this;

public build(): Promise<Buffer>;

 
}